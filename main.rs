use std::{
    collections::HashMap,
    sync::{mpsc, Arc, Mutex},
    thread,
    time::{Duration, Instant},
};

#[derive(Clone, Debug)]
struct Vec2 {
    x: f64,
    y: f64,
}

impl Vec2 {
    fn new(x: f64, y: f64) -> Self {
        Self { x, y }
    }

    fn add(&self, other: &Self) -> Self {
        Self {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }

    fn scale(&self, s: f64) -> Self {
        Self {
            x: self.x * s,
            y: self.y * s,
        }
    }

    fn length(&self) -> f64 {
        (self.x * self.x + self.y * self.y).sqrt()
    }
}

trait Entity {
    fn update(&mut self, dt: f64);
    fn name(&self) -> &str;
}

#[derive(Clone)]
struct Particle {
    id: usize,
    name: String,
    position: Vec2,
    velocity: Vec2,
}

impl Entity for Particle {
    fn update(&mut self, dt: f64) {
        self.position = self.position.add(&self.velocity.scale(dt));
    }

    fn name(&self) -> &str {
        &self.name
    }
}

struct World {
    objects: Vec<Particle>,
}

impl World {
    fn new() -> Self {
        Self {
            objects: Vec::new(),
        }
    }

    fn spawn(&mut self, p: Particle) {
        self.objects.push(p);
    }

    fn tick(&mut self, dt: f64) {
        for obj in &mut self.objects {
            obj.update(dt);
        }
    }

    fn energy(&self) -> f64 {
        self.objects
            .iter()
            .map(|p| p.velocity.length().powi(2))
            .sum()
    }
}

fn histogram(values: &[usize]) -> HashMap<usize, usize> {
    let mut map = HashMap::new();

    for v in values {
        *map.entry(*v).or_insert(0) += 1;
    }

    map
}

fn parallel_sum(data: Vec<i64>) -> i64 {
    let threads = 4;
    let chunk = data.len() / threads.max(1);

    let shared = Arc::new(data);
    let (tx, rx) = mpsc::channel();

    for i in 0..threads {
        let tx = tx.clone();
        let data = Arc::clone(&shared);

        thread::spawn(move || {
            let start = i * chunk;
            let end = if i == threads - 1 {
                data.len()
            } else {
                start + chunk
            };

            let sum: i64 = data[start..end].iter().sum();
            tx.send(sum).unwrap();
        });
    }

    drop(tx);

    rx.iter().sum()
}

fn generic_average<T>(items: &[T]) -> f64
where
    T: Copy + Into<f64>,
{
    let sum: f64 = items.iter().map(|x| (*x).into()).sum();
    sum / items.len() as f64
}

fn main() {
    let mut world = World::new();

    for i in 0..10 {
        world.spawn(Particle {
            id: i,
            name: format!("particle-{i}"),
            position: Vec2::new(i as f64, 0.0),
            velocity: Vec2::new(1.0 + i as f64 * 0.2, 0.5),
        });
    }

    let start = Instant::now();

    for _ in 0..100 {
        world.tick(0.016);
    }

    println!("Elapsed: {:?}", start.elapsed());

    println!("Energy: {:.3}", world.energy());

    let nums: Vec<i64> = (0..1_000_000).collect();
    println!("Parallel sum: {}", parallel_sum(nums));

    let avg = generic_average(&[1.0f64, 2.0, 3.0, 4.0, 5.0]);
    println!("Average: {:.2}", avg);

    let hist = histogram(&[
        1,2,2,3,3,3,4,4,4,4,
        5,5,5,5,5,
    ]);

    println!("Histogram:");
    for (k, v) in hist.iter() {
        println!("{k} -> {v}");
    }

    let shared_counter = Arc::new(Mutex::new(0usize));
    let mut handles = Vec::new();

    for _ in 0..8 {
        let counter = Arc::clone(&shared_counter);

        handles.push(thread::spawn(move || {
            for _ in 0..10000 {
                *counter.lock().unwrap() += 1;
            }
        }));
    }

    for h in handles {
        h.join().unwrap();
    }

    println!(
        "Counter = {}",
        *shared_counter.lock().unwrap()
    );

    println!("Final positions:");

    for p in world.objects {
        println!(
            "#{} {} => ({:.2}, {:.2})",
            p.id,
            p.name(),
            p.position.x,
            p.position.y
        );
    }

    thread::sleep(Duration::from_millis(10));
}
