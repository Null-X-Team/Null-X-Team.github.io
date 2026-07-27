struct Struct0 { field0: i32, field1: String, field2: bool }
struct Struct1 { field0: u64, field1: f32, field2: Vec<i32> }
struct Struct2 { field0: String, field1: i32, field2: f64 }
struct Struct3 { field0: bool, field1: Vec<String>, field2: u32 }
struct Struct4 { field0: i64, field1: String, field2: f32 }
struct Struct5 { field0: u32, field1: bool, field2: Vec<u8> }
struct Struct6 { field0: f64, field1: i32, field2: String }
struct Struct7 { field0: String, field1: u64, field2: bool }
struct Struct8 { field0: i32, field1: Vec<f32>, field2: u32 }
struct Struct9 { field0: bool, field1: String, field2: i64 }
struct Struct10 { field0: f32, field1: u32, field2: Vec<i32> }
struct Struct11 { field0: String, field1: i32, field2: f64 }
struct Struct12 { field0: u64, field1: bool, field2: String }
struct Struct13 { field0: i32, field1: f32, field2: Vec<u32> }
struct Struct14 { field0: String, field1: u32, field2: i64 }
struct Struct15 { field0: bool, field1: f64, field2: String }
struct Struct16 { field0: i32, field1: Vec<String>, field2: u64 }
struct Struct17 { field0: f32, field1: String, field2: bool }
struct Struct18 { field0: u32, field1: i32, field2: Vec<f64> }
struct Struct19 { field0: String, field1: u64, field2: f32 }

impl Struct0 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> bool { false }
    fn method4(&self) -> u32 { 0 }
}

impl Struct1 {
    fn method0(&self) -> u64 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> f32 { 0.0 }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> bool { true }
}

impl Struct2 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> f64 { 0.0 }
    fn method4(&self) -> Vec<u8> { Vec::new() }
}

impl Struct3 {
    fn method0(&self) -> bool { false }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> u32 { 0 }
    fn method4(&self) -> i64 { 0 }
}

impl Struct4 {
    fn method0(&self) -> i64 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> f32 { 0.0 }
    fn method4(&self) -> bool { false }
}

fn function0() { }
fn function1() -> i32 { 0 }
fn function2() -> String { String::new() }
fn function3() -> bool { false }
fn function4() -> f32 { 0.0 }
fn function5(a: i32) -> i32 { a }
fn function6(a: String) -> String { a }
fn function7(a: bool) -> bool { a }
fn function8(a: f32) -> f32 { a }
fn function9(a: u32) -> u32 { a }
fn function10(a: i32, b: i32) -> i32 { a + b }
fn function11(a: String, b: String) -> String { format!("{}{}", a, b) }
fn function12(a: bool, b: bool) -> bool { a && b }
fn function13(a: f32, b: f32) -> f32 { a + b }
fn function14(a: u32, b: u32) -> u32 { a + b }
fn function15(a: i32, b: i32, c: i32) -> i32 { a + b + c }
fn function16(a: String, b: String, c: String) -> String { format!("{}{}{}", a, b, c) }
fn function17(a: bool, b: bool, c: bool) -> bool { a && b && c }
fn function18(a: f32, b: f32, c: f32) -> f32 { a + b + c }
fn function19(a: u32, b: u32, c: u32) -> u32 { a + b + c }

struct Struct20 { field0: i32, field1: String }
struct Struct21 { field0: u64, field1: f32 }
struct Struct22 { field0: String, field1: i32 }
struct Struct23 { field0: bool, field1: Vec<String> }
struct Struct24 { field0: i64, field1: String }
struct Struct25 { field0: u32, field1: bool }
struct Struct26 { field0: f64, field1: i32 }
struct Struct27 { field0: String, field1: u64 }
struct Struct28 { field0: i32, field1: Vec<f32> }
struct Struct29 { field0: bool, field1: String }
struct Struct30 { field0: f32, field1: u32 }
struct Struct31 { field0: String, field1: i32 }
struct Struct32 { field0: u64, field1: bool }
struct Struct33 { field0: i32, field1: f32 }
struct Struct34 { field0: String, field1: u32 }
struct Struct35 { field0: bool, field1: f64 }
struct Struct36 { field0: i32, field1: Vec<String> }
struct Struct37 { field0: f32, field1: String }
struct Struct38 { field0: u32, field1: i32 }
struct Struct39 { field0: String, field1: u64 }

impl Struct5 {
    fn method0(&self) -> u32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> bool { true }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> Vec<u8> { Vec::new() }
}

impl Struct6 {
    fn method0(&self) -> f64 { 0.0 }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> bool { false }
}

impl Struct7 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> u64 { 0 }
    fn method3(&self) -> bool { true }
    fn method4(&self) -> f32 { 0.0 }
}

impl Struct8 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> Vec<f32> { Vec::new() }
    fn method3(&self) -> u32 { 0 }
    fn method4(&self) -> String { String::new() }
}

impl Struct9 {
    fn method0(&self) -> bool { false }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> i64 { 0 }
    fn method4(&self) -> f64 { 0.0 }
}

fn function20() -> i32 { 42 }
fn function21() -> String { "hello".to_string() }
fn function22() -> bool { true }
fn function23() -> f32 { 3.14 }
fn function24() -> u32 { 100 }
fn function25(x: i32) -> i32 { x * 2 }
fn function26(s: String) -> String { s.to_uppercase() }
fn function27(b: bool) -> bool { !b }
fn function28(f: f32) -> f32 { f * 2.0 }
fn function29(u: u32) -> u32 { u / 2 }
fn function30(a: i32, b: i32) -> bool { a > b }
fn function31(a: String, b: String) -> bool { a == b }
fn function32(a: bool, b: bool) -> bool { a || b }
fn function33(a: f32, b: f32) -> bool { a < b }
fn function34(a: u32, b: u32) -> bool { a >= b }
fn function35(x: i32) -> String { x.to_string() }
fn function36(s: String) -> i32 { s.len() as i32 }
fn function37(b: bool) -> i32 { if b { 1 } else { 0 } }
fn function38(f: f32) -> i32 { f as i32 }
fn function39(u: u32) -> i64 { u as i64 }

struct Struct40 { value: i32 }
struct Struct41 { value: String }
struct Struct42 { value: bool }
struct Struct43 { value: f32 }
struct Struct44 { value: u32 }
struct Struct45 { value: i64 }
struct Struct46 { value: u64 }
struct Struct47 { value: f64 }
struct Struct48 { value: Vec<i32> }
struct Struct49 { value: Vec<String> }
struct Struct50 { value: Option<i32> }
struct Struct51 { value: Option<String> }
struct Struct52 { value: Result<i32, String> }
struct Struct53 { value: Result<String, i32> }
struct Struct54 { value: (i32, String) }
struct Struct55 { value: (bool, f32) }
struct Struct56 { value: [i32; 5] }
struct Struct57 { value: [String; 3] }
struct Struct58 { data: Vec<(i32, String)> }
struct Struct59 { data: Vec<(bool, f32)> }

impl Struct10 {
    fn method0(&self) -> f32 { 0.0 }
    fn method1(&mut self) { }
    fn method2(&self) -> u32 { 0 }
    fn method3(&self) -> Vec<i32> { Vec::new() }
    fn method4(&self) -> String { String::new() }
}

impl Struct11 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> f64 { 0.0 }
    fn method4(&self) -> bool { false }
}

impl Struct12 {
    fn method0(&self) -> u64 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> bool { true }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> i32 { 0 }
}

impl Struct13 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> f32 { 0.0 }
    fn method3(&self) -> Vec<u32> { Vec::new() }
    fn method4(&self) -> String { String::new() }
}

impl Struct14 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> u32 { 0 }
    fn method3(&self) -> i64 { 0 }
    fn method4(&self) -> bool { false }
}

fn function40() -> Vec<i32> { vec![] }
fn function41() -> Vec<String> { vec![] }
fn function42() -> Option<i32> { None }
fn function43() -> Option<String> { None }
fn function44() -> Result<i32, String> { Ok(0) }
fn function45() -> Result<String, i32> { Ok(String::new()) }
fn function46(v: Vec<i32>) -> usize { v.len() }
fn function47(v: Vec<String>) -> usize { v.len() }
fn function48(o: Option<i32>) -> bool { o.is_some() }
fn function49(o: Option<String>) -> bool { o.is_none() }
fn function50(r: Result<i32, String>) -> bool { r.is_ok() }
fn function51(r: Result<String, i32>) -> bool { r.is_err() }
fn function52(v: &[i32]) -> i32 { v.len() as i32 }
fn function53(v: &[String]) -> usize { v.len() }
fn function54(t: (i32, String)) -> i32 { t.0 }
fn function55(t: (bool, f32)) -> f32 { t.1 }
fn function56(a: &str) -> usize { a.len() }
fn function57(a: &str) -> String { a.to_uppercase() }
fn function58(a: &str) -> bool { a.is_empty() }
fn function59(a: &str) -> &str { a }

struct Struct60 { x: i32, y: i32 }
struct Struct61 { name: String, age: u32 }
struct Struct62 { active: bool, count: i32 }
struct Struct63 { rate: f32, total: f64 }
struct Struct64 { items: Vec<i32> }
struct Struct65 { items: Vec<String> }
struct Struct66 { id: u64, data: String }
struct Struct67 { first: i32, second: String, third: bool }
struct Struct68 { a: f32, b: f32, c: f32 }
struct Struct69 { values: Vec<f64> }
struct Struct70 { option_val: Option<i32> }
struct Struct71 { result_val: Result<String, i32> }
struct Struct72 { tuple_val: (i32, String) }
struct Struct73 { array_val: [u8; 10] }
struct Struct74 { nested: Box<Struct60> }
struct Struct75 { ptr: *const i32 }
struct Struct76 { string_ref: String }
struct Struct77 { vec_ref: Vec<i32> }
struct Struct78 { tuple: (i32, i32, i32) }
struct Struct79 { map_data: Vec<(String, i32)> }

impl Struct15 {
    fn method0(&self) -> bool { false }
    fn method1(&mut self) { }
    fn method2(&self) -> f64 { 0.0 }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> i32 { 0 }
}

impl Struct16 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> Vec<String> { Vec::new() }
    fn method3(&self) -> u64 { 0 }
    fn method4(&self) -> bool { true }
}

impl Struct17 {
    fn method0(&self) -> f32 { 0.0 }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> bool { false }
    fn method4(&self) -> u32 { 0 }
}

impl Struct18 {
    fn method0(&self) -> u32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> Vec<f64> { Vec::new() }
    fn method4(&self) -> String { String::new() }
}

impl Struct19 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> u64 { 0 }
    fn method3(&self) -> f32 { 0.0 }
    fn method4(&self) -> bool { false }
}

fn function60(a: i32, b: i32) -> i32 { a - b }
fn function61(a: i32, b: i32) -> i32 { a * b }
fn function62(a: i32, b: i32) -> i32 { a / b }
fn function63(a: i32, b: i32) -> i32 { a % b }
fn function64(a: f32, b: f32) -> f32 { a - b }
fn function65(a: f32, b: f32) -> f32 { a * b }
fn function66(a: f32, b: f32) -> f32 { a / b }
fn function67(a: u32, b: u32) -> u32 { a.wrapping_add(b) }
fn function68(a: u32, b: u32) -> u32 { a.wrapping_sub(b) }
fn function69(a: u32, b: u32) -> u32 { a.wrapping_mul(b) }
fn function70(a: i32) -> i32 { a.abs() }
fn function71(a: f32) -> f32 { a.abs() }
fn function72(a: f32) -> f32 { a.floor() }
fn function73(a: f32) -> f32 { a.ceil() }
fn function74(a: f32) -> f32 { a.sqrt() }
fn function75(a: f32, b: f32) -> f32 { a.powf(b) }
fn function76(a: f32) -> f32 { a.sin() }
fn function77(a: f32) -> f32 { a.cos() }
fn function78(a: f32) -> f32 { a.tan() }
fn function79(a: f32) -> f32 { a.ln() }

struct Struct80 { data: String }
struct Struct81 { count: i32 }
struct Struct82 { flag: bool }
struct Struct83 { ratio: f32 }
struct Struct84 { items: Vec<i32> }
struct Struct85 { names: Vec<String> }
struct Struct86 { id: u64 }
struct Struct87 { code: String }
struct Struct88 { valid: bool }
struct Struct89 { score: f64 }
struct Struct90 { buffer: Vec<u8> }
struct Struct91 { text: String }
struct Struct92 { index: usize }
struct Struct93 { timestamp: u64 }
struct Struct94 { hash: u32 }
struct Struct95 { state: i32 }
struct Struct96 { phase: u8 }
struct Struct97 { level: i32 }
struct Struct98 { depth: u32 }
struct Struct99 { width: u32 }

impl Struct20 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> bool { false }
    fn method4(&self) -> f32 { 0.0 }
}

impl Struct21 {
    fn method0(&self) -> u64 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> f32 { 0.0 }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> i32 { 0 }
}

impl Struct22 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> bool { true }
    fn method4(&self) -> u32 { 0 }
}

impl Struct23 {
    fn method0(&self) -> bool { false }
    fn method1(&mut self) { }
    fn method2(&self) -> Vec<String> { Vec::new() }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> i32 { 0 }
}

impl Struct24 {
    fn method0(&self) -> i64 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> f32 { 0.0 }
    fn method4(&self) -> bool { false }
}

fn function80() -> i32 { -42 }
fn function81() -> String { "world".to_string() }
fn function82() -> bool { false }
fn function83() -> f32 { 2.71 }
fn function84() -> u32 { 200 }
fn function85(x: i32) -> i32 { x + 1 }
fn function86(s: String) -> String { s.to_lowercase() }
fn function87(b: bool) -> String { b.to_string() }
fn function88(f: f32) -> i32 { f.round() as i32 }
fn function89(u: u32) -> f32 { u as f32 }
fn function90(a: i32, b: i32) -> bool { a <= b }
fn function91(a: String, b: String) -> bool { a != b }
fn function92(a: bool, b: bool) -> bool { a != b }
fn function93(a: f32, b: f32) -> bool { a > b }
fn function94(a: u32, b: u32) -> bool { a <= b }
fn function95(x: i32) -> bool { x.is_positive() }
fn function96(s: String) -> bool { s.is_empty() }
fn function97(b: bool) -> String { if b { "yes" } else { "no" }.to_string() }
fn function98(f: f32) -> bool { f.is_finite() }
fn function99(u: u32) -> bool { u > 0 }

struct Struct100 { inner: i32 }
struct Struct101 { inner: String }
struct Struct102 { inner: bool }
struct Struct103 { inner: f32 }
struct Struct104 { inner: u32 }
struct Struct105 { inner: i64 }
struct Struct106 { inner: u64 }
struct Struct107 { inner: f64 }
struct Struct108 { inner: Vec<i32> }
struct Struct109 { inner: Vec<String> }
struct Struct110 { inner: Option<i32> }
struct Struct111 { inner: Option<String> }
struct Struct112 { inner: Result<i32, String> }
struct Struct113 { inner: Result<String, i32> }
struct Struct114 { inner: (i32, String) }
struct Struct115 { inner: (bool, f32) }
struct Struct116 { inner: [i32; 5] }
struct Struct117 { inner: [String; 3] }
struct Struct118 { inner: Box<i32> }
struct Struct119 { inner: Box<String> }

impl Struct25 {
    fn method0(&self) -> u32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> bool { true }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> i32 { 0 }
}

impl Struct26 {
    fn method0(&self) -> f64 { 0.0 }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> bool { false }
}

impl Struct27 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> u64 { 0 }
    fn method3(&self) -> bool { true }
    fn method4(&self) -> f32 { 0.0 }
}

impl Struct28 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> Vec<f32> { Vec::new() }
    fn method3(&self) -> u32 { 0 }
    fn method4(&self) -> String { String::new() }
}

impl Struct29 {
    fn method0(&self) -> bool { false }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> i64 { 0 }
    fn method4(&self) -> f64 { 0.0 }
}

fn function100() -> Vec<i32> { vec![1, 2, 3] }
fn function101() -> Vec<String> { vec!["a".to_string(), "b".to_string()] }
fn function102() -> Option<i32> { Some(42) }
fn function103() -> Option<String> { Some("hello".to_string()) }
fn function104() -> Result<i32, String> { Ok(100) }
fn function105() -> Result<String, i32> { Err(404) }
fn function106(mut v: Vec<i32>) -> Vec<i32> { v.reverse(); v }
fn function107(mut v: Vec<String>) -> Vec<String> { v.sort(); v }
fn function108(o: Option<i32>) -> i32 { o.unwrap_or(0) }
fn function109(o: Option<String>) -> String { o.unwrap_or_default() }
fn function110(r: Result<i32, String>) -> i32 { r.unwrap_or(0) }
fn function111(r: Result<String, i32>) -> String { r.unwrap_or_default() }
fn function112(v: &[i32]) -> i32 { v.iter().sum() }
fn function113(v: &[i32]) -> i32 { v.iter().max().copied().unwrap_or(0) }
fn function114(v: &[i32]) -> i32 { v.iter().min().copied().unwrap_or(0) }
fn function115(t: (i32, String)) -> String { t.1 }
fn function116(t: (bool, f32)) -> bool { t.0 }
fn function117(a: &str) -> &str { a.trim() }
fn function118(a: &str) -> bool { a.contains('a') }
fn function119(a: &str) -> bool { a.ends_with("ing") }

struct Struct120 { a: i32 }
struct Struct121 { b: String }
struct Struct122 { c: bool }
struct Struct123 { d: f32 }
struct Struct124 { e: u32 }
struct Struct125 { f: i64 }
struct Struct126 { g: u64 }
struct Struct127 { h: f64 }
struct Struct128 { i: Vec<i32> }
struct Struct129 { j: Vec<String> }
struct Struct130 { k: Option<i32> }
struct Struct131 { l: Option<String> }
struct Struct132 { m: Result<i32, String> }
struct Struct133 { n: Result<String, i32> }
struct Struct134 { o: (i32, String) }
struct Struct135 { p: (bool, f32) }
struct Struct136 { q: [i32; 5] }
struct Struct137 { r: [String; 3] }
struct Struct138 { s: String }
struct Struct139 { t: Vec<u8> }

impl Struct30 {
    fn method0(&self) -> f32 { 0.0 }
    fn method1(&mut self) { }
    fn method2(&self) -> u32 { 0 }
    fn method3(&self) -> Vec<i32> { Vec::new() }
    fn method4(&self) -> String { String::new() }
}

impl Struct31 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> f64 { 0.0 }
    fn method4(&self) -> bool { false }
}

impl Struct32 {
    fn method0(&self) -> u64 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> bool { true }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> i32 { 0 }
}

impl Struct33 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> f32 { 0.0 }
    fn method3(&self) -> Vec<u32> { Vec::new() }
    fn method4(&self) -> String { String::new() }
}

impl Struct34 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> u32 { 0 }
    fn method3(&self) -> i64 { 0 }
    fn method4(&self) -> bool { false }
}

fn function120() -> i32 { 123 }
fn function121() -> String { "rust".to_string() }
fn function122() -> bool { true }
fn function123() -> f32 { 1.41 }
fn function124() -> u32 { 256 }
fn function125(x: i32) -> i32 { x - 1 }
fn function126(s: String) -> String { format!("prefix_{}", s) }
fn function127(b: bool) -> i32 { if b { 1 } else { 0 } }
fn function128(f: f32) -> f32 { f.recip() }
fn function129(u: u32) -> u64 { u as u64 }
fn function130(a: i32, b: i32) -> i32 { a.max(b) }
fn function131(a: i32, b: i32) -> i32 { a.min(b) }
fn function132(a: String, b: String) -> String { format!("{}{}", a, b) }
fn function133(s: &str) -> usize { s.chars().count() }
fn function134(s: &str) -> bool { s.chars().all(|c| c.is_alphabetic()) }
fn function135(s: &str) -> bool { s.chars().all(|c| c.is_numeric()) }
fn function136(s: &str) -> String { s.chars().rev().collect() }
fn function137(v: Vec<i32>) -> i32 { v.into_iter().sum() }
fn function138(v: Vec<f32>) -> f32 { v.iter().sum() }
fn function139(v: &[i32]) -> bool { v.is_empty() }

struct Struct140 { x: i32 }
struct Struct141 { y: i32 }
struct Struct142 { z: i32 }
struct Struct143 { w: String }
struct Struct144 { h: String }
struct Struct145 { i: String }
struct Struct146 { j: String }
struct Struct147 { k: bool }
struct Struct148 { l: bool }
struct Struct149 { m: bool }
struct Struct150 { n: f32 }
struct Struct151 { o: f32 }
struct Struct152 { p: f32 }
struct Struct153 { q: u32 }
struct Struct154 { r: u32 }
struct Struct155 { s: u32 }
struct Struct156 { t: i64 }
struct Struct157 { u: i64 }
struct Struct158 { v: i64 }
struct Struct159 { w: u64 }

impl Struct35 {
    fn method0(&self) -> bool { false }
    fn method1(&mut self) { }
    fn method2(&self) -> f64 { 0.0 }
    fn method3(&self) -> String { String::new() }
    fn method4(&self) -> i32 { 0 }
}

impl Struct36 {
    fn method0(&self) -> i32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> Vec<String> { Vec::new() }
    fn method3(&self) -> u64 { 0 }
    fn method4(&self) -> bool { true }
}

impl Struct37 {
    fn method0(&self) -> f32 { 0.0 }
    fn method1(&mut self) { }
    fn method2(&self) -> String { String::new() }
    fn method3(&self) -> bool { false }
    fn method4(&self) -> u32 { 0 }
}

impl Struct38 {
    fn method0(&self) -> u32 { 0 }
    fn method1(&mut self) { }
    fn method2(&self) -> i32 { 0 }
    fn method3(&self) -> Vec<f64> { Vec::new() }
    fn method4(&self) -> String { String::new() }
}

impl Struct39 {
    fn method0(&self) -> String { String::new() }
    fn method1(&mut self) { }
    fn method2(&self) -> u64 { 0 }
    fn method3(&self) -> f32 { 0.0 }
    fn method4(&self) -> bool { false }
}

fn function140(x: i32) -> i32 { x }
fn function141(x: i32) -> i32 { x }
fn function142(x: i32) -> i32 { x }
fn function143(x: i32) -> i32 { x }
fn function144(x: i32) -> i32 { x }
fn function145(x: i32) -> i32 { x }
fn function146(x: i32) -> i32 { x }
fn function147(x: i32) -> i32 { x }
fn function148(x: i32) -> i32 { x }
fn function149(x: i32) -> i32 { x }
fn function150() { println!("150"); }
fn function151() { println!("151"); }
fn function152() { println!("152"); }
fn function153() { println!("153"); }
fn function154() { println!("154"); }
fn function155() { println!("155"); }
fn function156() { println!("156"); }
fn function157() { println!("157"); }
fn function158() { println!("158"); }
fn function159() { println!("159"); }

trait Trait0 {
    fn method(&self) -> i32;
}

trait Trait1 {
    fn method(&self) -> String;
}

trait Trait2 {
    fn method(&self) -> bool;
}

trait Trait3 {
    fn method(&self) -> f32;
}

trait Trait4 {
    fn method(&self) -> u32;
}

impl Trait0 for Struct0 {
    fn method(&self) -> i32 { 0 }
}

impl Trait1 for Struct1 {
    fn method(&self) -> String { String::new() }
}

impl Trait2 for Struct2 {
    fn method(&self) -> bool { false }
}

impl Trait3 for Struct3 {
    fn method(&self) -> f32 { 0.0 }
}

impl Trait4 for Struct4 {
    fn method(&self) -> u32 { 0 }
}

struct Struct160 { a: i32 }
struct Struct161 { b: i32 }
struct Struct162 { c: i32 }
struct Struct163 { d: i32 }
struct Struct164 { e: i32 }
struct Struct165 { f: i32 }
struct Struct166 { g: i32 }
struct Struct167 { h: i32 }
struct Struct168 { i: i32 }
struct Struct169 { j: i32 }
struct Struct170 { a: String }
struct Struct171 { b: String }
struct Struct172 { c: String }
struct Struct173 { d: String }
struct Struct174 { e: String }
struct Struct175 { f: String }
struct Struct176 { g: String }
struct Struct177 { h: String }
struct Struct178 { i: String }
struct Struct179 { j: String }

impl Struct40 {
    fn method(&self) -> i32 { self.value }
}

impl Struct41 {
    fn method(&self) -> String { self.value.clone() }
}

impl Struct42 {
    fn method(&self) -> bool { self.value }
}

impl Struct43 {
    fn method(&self) -> f32 { self.value }
}

impl Struct44 {
    fn method(&self) -> u32 { self.value }
}

impl Struct45 {
    fn method(&self) -> i64 { self.value }
}

impl Struct46 {
    fn method(&self) -> u64 { self.value }
}

impl Struct47 {
    fn method(&self) -> f64 { self.value }
}

impl Struct48 {
    fn method(&self) -> Vec<i32> { self.value.clone() }
}

impl Struct49 {
    fn method(&self) -> Vec<String> { self.value.clone() }
}

fn function160() -> i32 { 0 }
fn function161() -> i32 { 0 }
fn function162() -> i32 { 0 }
fn function163() -> i32 { 0 }
fn function164() -> i32 { 0 }
fn function165() -> i32 { 0 }
fn function166() -> i32 { 0 }
fn function167() -> i32 { 0 }
fn function168() -> i32 { 0 }
fn function169() -> i32 { 0 }
fn function170() { }
fn function171() { }
fn function172() { }
fn function173() { }
fn function174() { }
fn function175() { }
fn function176() { }
fn function177() { }
fn function178() { }
fn function179() { }

trait Trait5 {
    fn method(&self) -> i32;
}

trait Trait6 {
    fn method(&self) -> String;
}

trait Trait7 {
    fn method(&self) -> bool;
}

trait Trait8 {
    fn method(&self) -> f32;
}

trait Trait9 {
    fn method(&self) -> u32;
}

impl Trait5 for Struct5 {
    fn method(&self) -> i32 { 0 }
}

impl Trait6 for Struct6 {
    fn method(&self) -> String { String::new() }
}

impl Trait7 for Struct7 {
    fn method(&self) -> bool { false }
}

impl Trait8 for Struct8 {
    fn method(&self) -> f32 { 0.0 }
}

impl Trait9 for Struct9 {
    fn method(&self) -> u32 { 0 }
}

struct Struct180 { data: i32 }
struct Struct181 { data: String }
struct Struct182 { data: bool }
struct Struct183 { data: f32 }
struct Struct184 { data: u32 }
struct Struct185 { data: i64 }
struct Struct186 { data: u64 }
struct Struct187 { data: f64 }
struct Struct188 { data: Vec<i32> }
struct Struct189 { data: Vec<String> }
struct Struct190 { data: Option<i32> }
struct Struct191 { data: Option<String> }
struct Struct192 { data: Result<i32, String> }
struct Struct193 { data: Result<String, i32> }
struct Struct194 { data: (i32, String) }
struct Struct195 { data: (bool, f32) }
struct Struct196 { data: [i32; 5] }
struct Struct197 { data: [String; 3] }
struct Struct198 { data: String }
struct Struct199 { data: Vec<u8> }

impl Struct50 {
    fn method(&self) -> i32 { self.value.unwrap_or(0) }
}

impl Struct51 {
    fn method(&self) -> String { self.value.clone().unwrap_or_default() }
}

impl Struct52 {
    fn method(&self) -> i32 { self.value.as_ref().unwrap_or(&0).clone() }
}

impl Struct53 {
    fn method(&self) -> String { self.value.clone().unwrap_or_default() }
}

impl Struct54 {
    fn method(&self) -> i32 { self.value.0 }
}

impl Struct55 {
    fn method(&self) -> f32 { self.value.1 }
}

impl Struct56 {
    fn method(&self) -> i32 { self.value[0] }
}

impl Struct57 {
    fn method(&self) -> String { self.value[0].clone() }
}

impl Struct58 {
    fn method(&self) -> usize { self.data.len() }
}

impl Struct59 {
    fn method(&self) -> usize { self.data.len() }
}

fn function180() -> i32 { 0 }
fn function181() -> i32 { 0 }
fn function182() -> i32 { 0 }
fn function183() -> i32 { 0 }
fn function184() -> i32 { 0 }
fn function185() -> i32 { 0 }
fn function186() -> i32 { 0 }
fn function187() -> i32 { 0 }
fn function188() -> i32 { 0 }
fn function189() -> i32 { 0 }
fn function190() { }
fn function191() { }
fn function192() { }
fn function193() { }
fn function194() { }
fn function195() { }
fn function196() { }
fn function197() { }
fn function198() { }
fn function199() { }

struct Struct200 { value: i32 }
struct Struct201 { value: String }
struct Struct202 { value: bool }
struct Struct203 { value: f32 }
struct Struct204 { value: u32 }
struct Struct205 { value: i64 }
struct Struct206 { value: u64 }
struct Struct207 { value: f64 }
struct Struct208 { value: Vec<i32> }
struct Struct209 { value: Vec<String> }
struct Struct210 { value: Option<i32> }
struct Struct211 { value: Option<String> }
struct Struct212 { value: Result<i32, String> }
struct Struct213 { value: Result<String, i32> }
struct Struct214 { value: (i32, String) }
struct Struct215 { value: (bool, f32) }
struct Struct216 { value: [i32; 5] }
struct Struct217 { value: [String; 3] }
struct Struct218 { value: String }
struct Struct219 { value: Vec<u8> }

impl Struct60 {
    fn method(&self) -> i32 { self.x + self.y }
}

impl Struct61 {
    fn method(&self) -> String { format!("{}: {}", self.name, self.age) }
}

impl Struct62 {
    fn method(&self) -> i32 { if self.active { self.count } else { 0 } }
}

impl Struct63 {
    fn method(&self) -> f32 { self.rate }
}

impl Struct64 {
    fn method(&self) -> i32 { self.items.len() as i32 }
}

impl Struct65 {
    fn method(&self) -> usize { self.items.len() }
}

impl Struct66 {
    fn method(&self) -> String { self.data.clone() }
}

impl Struct67 {
    fn method(&self) -> i32 { self.first }
}

impl Struct68 {
    fn method(&self) -> f32 { self.a + self.b + self.c }
}

impl Struct69 {
    fn method(&self) -> usize { self.values.len() }
}

fn function200() -> i32 { 0 }
fn function201() -> i32 { 0 }
fn function202() -> i32 { 0 }
fn function203() -> i32 { 0 }
fn function204() -> i32 { 0 }
fn function205() -> i32 { 0 }
fn function206() -> i32 { 0 }
fn function207() -> i32 { 0 }
fn function208() -> i32 { 0 }
fn function209() -> i32 { 0 }
fn function210() { }
fn function211() { }
fn function212() { }
fn function213() { }
fn function214() { }
fn function215() { }
fn function216() { }
fn function217() { }
fn function218() { }
fn function219() { }

enum Enum0 { Variant0, Variant1(i32), Variant2(String), Variant3 { x: i32, y: String } }
enum Enum1 { A, B(i32), C(String), D { a: i32, b: String } }
enum Enum2 { One, Two(bool), Three(f32), Four { flag: bool, value: f32 } }
enum Enum3 { Alpha, Beta(u32), Gamma(Vec<i32>), Delta { id: u32, items: Vec<i32> } }
enum Enum4 { First, Second(String), Third(Vec<String>), Fourth { text: String, list: Vec<String> } }
enum Enum5 { P, Q(i64), R(u64), S { a: i64, b: u64 } }
enum Enum6 { X, Y(f32), Z(f64), W { x: f32, z: f64 } }
enum Enum7 { Red, Blue(i32), Green(String), Yellow { r: i32, g: String } }
enum Enum8 { Start, Middle(bool), End(String), Full { active: bool, msg: String } }
enum Enum9 { None, Some(i32), Many(Vec<i32>), All { count: i32, items: Vec<i32> } }

impl Enum0 {
    fn method(&self) -> i32 {
        match self {
            Enum0::Variant0 => 0,
            Enum0::Variant1(x) => *x,
            Enum0::Variant2(_) => 1,
            Enum0::Variant3 { x, .. } => *x,
        }
    }
}

impl Enum1 {
    fn method(&self) -> i32 {
        match self {
            Enum1::A => 0,
            Enum1::B(x) => *x,
            Enum1::C(_) => 1,
            Enum1::D { a, .. } => *a,
        }
    }
}

impl Enum2 {
    fn method(&self) -> i32 {
        match self {
            Enum2::One => 0,
            Enum2::Two(_) => 1,
            Enum2::Three(_) => 2,
            Enum2::Four { .. } => 3,
        }
    }
}

impl Enum3 {
    fn method(&self) -> i32 {
        match self {
            Enum3::Alpha => 0,
            Enum3::Beta(_) => 1,
            Enum3::Gamma(_) => 2,
            Enum3::Delta { .. } => 3,
        }
    }
}

impl Enum4 {
    fn method(&self) -> i32 {
        match self {
            Enum4::First => 0,
            Enum4::Second(_) => 1,
            Enum4::Third(_) => 2,
            Enum4::Fourth { .. } => 3,
        }
    }
}

fn function220() -> i32 { 0 }
fn function221() -> i32 { 0 }
fn function222() -> i32 { 0 }
fn function223() -> i32 { 0 }
fn function224() -> i32 { 0 }
fn function225() -> i32 { 0 }
fn function226() -> i32 { 0 }
fn function227() -> i32 { 0 }
fn function228() -> i32 { 0 }
fn function229() -> i32 { 0 }
fn function230() { }
fn function231() { }
fn function232() { }
fn function233() { }
fn function234() { }
fn function235() { }
fn function236() { }
fn function237() { }
fn function238() { }
fn function239() { }

struct Struct220 { value: i32 }
struct Struct221 { value: String }
struct Struct222 { value: bool }
struct Struct223 { value: f32 }
struct Struct224 { value: u32 }
struct Struct225 { value: i64 }
struct Struct226 { value: u64 }
struct Struct227 { value: f64 }
struct Struct228 { value: Vec<i32> }
struct Struct229 { value: Vec<String> }
struct Struct230 { value: Option<i32> }
struct Struct231 { value: Option<String> }
struct Struct232 { value: Result<i32, String> }
struct Struct233 { value: Result<String, i32> }
struct Struct234 { value: (i32, String) }
struct Struct235 { value: (bool, f32) }
struct Struct236 { value: [i32; 5] }
struct Struct237 { value: [String; 3] }
struct Struct238 { value: String }
struct Struct239 { value: Vec<u8> }

impl Struct70 {
    fn method(&self) -> i32 { self.option_val.unwrap_or(0) }
}

impl Struct71 {
    fn method(&self) -> String { self.result_val.clone().unwrap_or_default() }
}

impl Struct72 {
    fn method(&self) -> i32 { self.tuple_val.0 }
}

impl Struct73 {
    fn method(&self) -> u8 { self.array_val[0] }
}

impl Struct74 {
    fn method(&self) -> i32 { self.nested.x }
}

impl Struct75 {
    fn method(&self) -> i32 { 0 }
}

impl Struct76 {
    fn method(&self) -> String { self.string_ref.clone() }
}

impl Struct77 {
    fn method(&self) -> i32 { self.vec_ref.len() as i32 }
}

impl Struct78 {
    fn method(&self) -> i32 { self.tuple.0 + self.tuple.1 + self.tuple.2 }
}

impl Struct79 {
    fn method(&self) -> usize { self.map_data.len() }
}

fn function240() -> i32 { 0 }
fn function241() -> i32 { 0 }
fn function242() -> i32 { 0 }
fn function243() -> i32 { 0 }
fn function244() -> i32 { 0 }
fn function245() -> i32 { 0 }
fn function246() -> i32 { 0 }
fn function247() -> i32 { 0 }
fn function248() -> i32 { 0 }
fn function249() -> i32 { 0 }
fn function250() { }
fn function251() { }
fn function252() { }
fn function253() { }
fn function254() { }
fn function255() { }
fn function256() { }
fn function257() { }
fn function258() { }
fn function259() { }

struct Struct240 { value: i32 }
struct Struct241 { value: String }
struct Struct242 { value: bool }
struct Struct243 { value: f32 }
struct Struct244 { value: u32 }
struct Struct245 { value: i64 }
struct Struct246 { value: u64 }
struct Struct247 { value: f64 }
struct Struct248 { value: Vec<i32> }
struct Struct249 { value: Vec<String> }
struct Struct250 { value: Option<i32> }
struct Struct251 { value: Option<String> }
struct Struct252 { value: Result<i32, String> }
struct Struct253 { value: Result<String, i32> }
struct Struct254 { value: (i32, String) }
struct Struct255 { value: (bool, f32) }
struct Struct256 { value: [i32; 5] }
struct Struct257 { value: [String; 3] }
struct Struct258 { value: String }
struct Struct259 { value: Vec<u8> }

impl Enum5 {
    fn method(&self) -> i32 {
        match self {
            Enum5::P => 0,
            Enum5::Q(_) => 1,
            Enum5::R(_) => 2,
            Enum5::S { .. } => 3,
        }
    }
}

impl Enum6 {
    fn method(&self) -> i32 {
        match self {
            Enum6::X => 0,
            Enum6::Y(_) => 1,
            Enum6::Z(_) => 2,
            Enum6::W { .. } => 3,
        }
    }
}

impl Enum7 {
    fn method(&self) -> i32 {
        match self {
            Enum7::Red => 0,
            Enum7::Blue(_) => 1,
            Enum7::Green(_) => 2,
            Enum7::Yellow { .. } => 3,
        }
    }
}

impl Enum8 {
    fn method(&self) -> i32 {
        match self {
            Enum8::Start => 0,
            Enum8::Middle(_) => 1,
            Enum8::End(_) => 2,
            Enum8::Full { .. } => 3,
        }
    }
}

impl Enum9 {
    fn method(&self) -> i32 {
        match self {
            Enum9::None => 0,
            Enum9::Some(_) => 1,
            Enum9::Many(_) => 2,
            Enum9::All { .. } => 3,
        }
    }
}

fn function260() -> i32 { 0 }
fn function261() -> i32 { 0 }
fn function262() -> i32 { 0 }
fn function263() -> i32 { 0 }
fn function264() -> i32 { 0 }
fn function265() -> i32 { 0 }
fn function266() -> i32 { 0 }
fn function267() -> i32 { 0 }
fn function268() -> i32 { 0 }
fn function269() -> i32 { 0 }
fn function270() { }
fn function271() { }
fn function272() { }
fn function273() { }
fn function274() { }
fn function275() { }
fn function276() { }
fn function277() { }
fn function278() { }
fn function279() { }

trait Trait10 { fn method(&self) -> i32; }
trait Trait11 { fn method(&self) -> String; }
trait Trait12 { fn method(&self) -> bool; }
trait Trait13 { fn method(&self) -> f32; }
trait Trait14 { fn method(&self) -> u32; }
trait Trait15 { fn method(&self) -> i64; }
trait Trait16 { fn method(&self) -> u64; }
trait Trait17 { fn method(&self) -> f64; }
trait Trait18 { fn method(&self) -> Vec<i32>; }
trait Trait19 { fn method(&self) -> Vec<String>; }

impl Trait10 for Struct80 { fn method(&self) -> i32 { 0 } }
impl Trait11 for Struct81 { fn method(&self) -> String { String::new() } }
impl Trait12 for Struct82 { fn method(&self) -> bool { false } }
impl Trait13 for Struct83 { fn method(&self) -> f32 { 0.0 } }
impl Trait14 for Struct84 { fn method(&self) -> u32 { 0 } }
impl Trait15 for Struct85 { fn method(&self) -> i64 { 0 } }
impl Trait16 for Struct86 { fn method(&self) -> u64 { 0 } }
impl Trait17 for Struct87 { fn method(&self) -> f64 { 0.0 } }
impl Trait18 for Struct88 { fn method(&self) -> Vec<i32> { Vec::new() } }
impl Trait19 for Struct89 { fn method(&self) -> Vec<String> { Vec::new() } }

struct Struct260 { value: i32 }
struct Struct261 { value: String }
struct Struct262 { value: bool }
struct Struct263 { value: f32 }
struct Struct264 { value: u32 }
struct Struct265 { value: i64 }
struct Struct266 { value: u64 }
struct Struct267 { value: f64 }
struct Struct268 { value: Vec<i32> }
struct Struct269 { value: Vec<String> }
struct Struct270 { value: Option<i32> }
struct Struct271 { value: Option<String> }
struct Struct272 { value: Result<i32, String> }
struct Struct273 { value: Result<String, i32> }
struct Struct274 { value: (i32, String) }
struct Struct275 { value: (bool, f32) }
struct Struct276 { value: [i32; 5] }
struct Struct277 { value: [String; 3] }
struct Struct278 { value: String }
struct Struct279 { value: Vec<u8> }

impl Struct80 {
    fn method(&self) -> i32 { 0 }
}

impl Struct81 {
    fn method(&self) -> String { String::new() }
}

impl Struct82 {
    fn method(&self) -> bool { false }
}

impl Struct83 {
    fn method(&self) -> f32 { 0.0 }
}

impl Struct84 {
    fn method(&self) -> u32 { 0 }
}

impl Struct85 {
    fn method(&self) -> i32 { 0 }
}

impl Struct86 {
    fn method(&self) -> String { String::new() }
}

impl Struct87 {
    fn method(&self) -> bool { false }
}

impl Struct88 {
    fn method(&self) -> f32 { 0.0 }
}

impl Struct89 {
    fn method(&self) -> u32 { 0 }
}

fn function280() -> i32 { 0 }
fn function281() -> i32 { 0 }
fn function282() -> i32 { 0 }
fn function283() -> i32 { 0 }
fn function284() -> i32 { 0 }
fn function285() -> i32 { 0 }
fn function286() -> i32 { 0 }
fn function287() -> i32 { 0 }
fn function288() -> i32 { 0 }
fn function289() -> i32 { 0 }
fn function290() { }
fn function291() { }
fn function292() { }
fn function293() { }
fn function294() { }
fn function295() { }
fn function296() { }
fn function297() { }
fn function298() { }
fn function299() { }

struct Struct280 { v: i32 }
struct Struct281 { v: String }
struct Struct282 { v: bool }
struct Struct283 { v: f32 }
struct Struct284 { v: u32 }
struct Struct285 { v: i64 }
struct Struct286 { v: u64 }
struct Struct287 { v: f64 }
struct Struct288 { v: Vec<i32> }
struct Struct289 { v: Vec<String> }
struct Struct290 { v: Option<i32> }
struct Struct291 { v: Option<String> }
struct Struct292 { v: Result<i32, String> }
struct Struct293 { v: Result<String, i32> }
struct Struct294 { v: (i32, String) }
struct Struct295 { v: (bool, f32) }
struct Struct296 { v: [i32; 5] }
struct Struct297 { v: [String; 3] }
struct Struct298 { v: String }
struct Struct299 { v: Vec<u8> }

impl Struct90 {
    fn method(&self) -> i32 { 0 }
}

impl Struct91 {
    fn method(&self) -> String { String::new() }
}

impl Struct92 {
    fn method(&self) -> bool { false }
}

impl Struct93 {
    fn method(&self) -> f32 { 0.0 }
}

impl Struct94 {
    fn method(&self) -> u32 { 0 }
}

impl Struct95 {
    fn method(&self) -> i32 { 0 }
}

impl Struct96 {
    fn method(&self) -> String { String::new() }
}

impl Struct97 {
    fn method(&self) -> bool { false }
}

impl Struct98 {
    fn method(&self) -> f32 { 0.0 }
}

impl Struct99 {
    fn method(&self) -> u32 { 0 }
}

fn function300() -> i32 { 0 }
fn function301() -> i32 { 0 }
fn function302() -> i32 { 0 }
fn function303() -> i32 { 0 }
fn function304() -> i32 { 0 }
fn function305() -> i32 { 0 }
fn function306() -> i32 { 0 }
fn function307() -> i32 { 0 }
fn function308() -> i32 { 0 }
fn function309() -> i32 { 0 }
fn function310() { }
fn function311() { }
fn function312() { }
fn function313() { }
fn function314() { }
fn function315() { }
fn function316() { }
fn function317() { }
fn function318() { }
fn function319() { }

const CONST0: i32 = 0;
const CONST1: i32 = 1;
const CONST2: i32 = 2;
const CONST3: i32 = 3;
const CONST4: i32 = 4;
const CONST5: i32 = 5;
const CONST6: i32 = 6;
const CONST7: i32 = 7;
const CONST8: i32 = 8;
const CONST9: i32 = 9;
const CONST10: i32 = 10;
const CONST11: i32 = 11;
const CONST12: i32 = 12;
const CONST13: i32 = 13;
const CONST14: i32 = 14;
const CONST15: i32 = 15;
const CONST16: i32 = 16;
const CONST17: i32 = 17;
const CONST18: i32 = 18;
const CONST19: i32 = 19;

static STATIC0: i32 = 0;
static STATIC1: i32 = 1;
static STATIC2: i32 = 2;
static STATIC3: i32 = 3;
static STATIC4: i32 = 4;
static STATIC5: i32 = 5;
static STATIC6: i32 = 6;
static STATIC7: i32 = 7;
static STATIC8: i32 = 8;
static STATIC9: i32 = 9;
static STATIC10: i32 = 10;
static STATIC11: i32 = 11;
static STATIC12: i32 = 12;
static STATIC13: i32 = 13;
static STATIC14: i32 = 14;
static STATIC15: i32 = 15;
static STATIC16: i32 = 16;
static STATIC17: i32 = 17;
static STATIC18: i32 = 18;
static STATIC19: i32 = 19;

type Alias0 = i32;
type Alias1 = String;
type Alias2 = bool;
type Alias3 = f32;
type Alias4 = u32;
type Alias5 = i64;
type Alias6 = u64;
type Alias7 = f64;
type Alias8 = Vec<i32>;
type Alias9 = Vec<String>;
type Alias10 = Option<i32>;
type Alias11 = Option<String>;
type Alias12 = Result<i32, String>;
type Alias13 = Result<String, i32>;
type Alias14 = (i32, String);
type Alias15 = (bool, f32);
type Alias16 = [i32; 5];
type Alias17 = [String; 3];
type Alias18 = Box<i32>;
type Alias19 = Box<String>;

fn function320(x: Alias0) -> Alias0 { x }
fn function321(x: Alias1) -> Alias1 { x }
fn function322(x: Alias2) -> Alias2 { x }
fn function323(x: Alias3) -> Alias3 { x }
fn function324(x: Alias4) -> Alias4 { x }
fn function325(x: Alias5) -> Alias5 { x }
fn function326(x: Alias6) -> Alias6 { x }
fn function327(x: Alias7) -> Alias7 { x }
fn function328(x: Alias8) -> Alias8 { x }
fn function329(x: Alias9) -> Alias9 { x }
fn function330() { }
fn function331() { }
fn function332() { }
fn function333() { }
fn function334() { }
fn function335() { }
fn function336() { }
fn function337() { }
fn function338() { }
fn function339() { }

struct Struct300 { v: i32 }
struct Struct301 { v: String }
struct Struct302 { v: bool }
struct Struct303 { v: f32 }
struct Struct304 { v: u32 }
struct Struct305 { v: i64 }
struct Struct306 { v: u64 }
struct Struct307 { v: f64 }
struct Struct308 { v: Vec<i32> }
struct Struct309 { v: Vec<String> }
struct Struct310 { v: Option<i32> }
struct Struct311 { v: Option<String> }
struct Struct312 { v: Result<i32, String> }
struct Struct313 { v: Result<String, i32> }
struct Struct314 { v: (i32, String) }
struct Struct315 { v: (bool, f32) }
struct Struct316 { v: [i32; 5] }
struct Struct317 { v: [String; 3] }
struct Struct318 { v: String }
struct Struct319 { v: Vec<u8> }

impl Struct100 {
    fn method(&self) -> i32 { self.inner }
}

impl Struct101 {
    fn method(&self) -> String { self.inner.clone() }
}

impl Struct102 {
    fn method(&self) -> bool { self.inner }
}

impl Struct103 {
    fn method(&self) -> f32 { self.inner }
}

impl Struct104 {
    fn method(&self) -> u32 { self.inner }
}

impl Struct105 {
    fn method(&self) -> i64 { self.inner }
}

impl Struct106 {
    fn method(&self) -> u64 { self.inner }
}

impl Struct107 {
    fn method(&self) -> f64 { self.inner }
}

impl Struct108 {
    fn method(&self) -> Vec<i32> { self.inner.clone() }
}

impl Struct109 {
    fn method(&self) -> Vec<String> { self.inner.clone() }
}

fn function340() -> i32 { 0 }
fn function341() -> i32 { 0 }
fn function342() -> i32 { 0 }
fn function343() -> i32 { 0 }
fn function344() -> i32 { 0 }
fn function345() -> i32 { 0 }
fn function346() -> i32 { 0 }
fn function347() -> i32 { 0 }
fn function348() -> i32 { 0 }
fn function349() -> i32 { 0 }
fn function350() { }
fn function351() { }
fn function352() { }
fn function353() { }
fn function354() { }
fn function355() { }
fn function356() { }
fn function357() { }
fn function358() { }
fn function359() { }

struct Struct320 { v: i32 }
struct Struct321 { v: String }
struct Struct322 { v: bool }
struct Struct323 { v: f32 }
struct Struct324 { v: u32 }
struct Struct325 { v: i64 }
struct Struct326 { v: u64 }
struct Struct327 { v: f64 }
struct Struct328 { v: Vec<i32> }
struct Struct329 { v: Vec<String> }
struct Struct330 { v: Option<i32> }
struct Struct331 { v: Option<String> }
struct Struct332 { v: Result<i32, String> }
struct Struct333 { v: Result<String, i32> }
struct Struct334 { v: (i32, String) }
struct Struct335 { v: (bool, f32) }
struct Struct336 { v: [i32; 5] }
struct Struct337 { v: [String; 3] }
struct Struct338 { v: String }
struct Struct339 { v: Vec<u8> }

// More filler to reach 10,000 lines

fn dummy_fn_360() {}
fn dummy_fn_361() {}
fn dummy_fn_362() {}
fn dummy_fn_363() {}
fn dummy_fn_364() {}
fn dummy_fn_365() {}
fn dummy_fn_366() {}
fn dummy_fn_367() {}
fn dummy_fn_368() {}
fn dummy_fn_369() {}
fn dummy_fn_370() {}
fn dummy_fn_371() {}
fn dummy_fn_372() {}
fn dummy_fn_373() {}
fn dummy_fn_374() {}
fn dummy_fn_375() {}
fn dummy_fn_376() {}
fn dummy_fn_377() {}
fn dummy_fn_378() {}
fn dummy_fn_379() {}
fn dummy_fn_380() {}
fn dummy_fn_381() {}
fn dummy_fn_382() {}
fn dummy_fn_383() {}
fn dummy_fn_384() {}
fn dummy_fn_385() {}
fn dummy_fn_386() {}
fn dummy_fn_387() {}
fn dummy_fn_388() {}
fn dummy_fn_389() {}
fn dummy_fn_390() {}
fn dummy_fn_391() {}
fn dummy_fn_392() {}
fn dummy_fn_393() {}
fn dummy_fn_394() {}
fn dummy_fn_395() {}
fn dummy_fn_396() {}
fn dummy_fn_397() {}
fn dummy_fn_398() {}
fn dummy_fn_399() {}
fn dummy_fn_400() {}
fn dummy_fn_401() {}
fn dummy_fn_402() {}
fn dummy_fn_403() {}
fn dummy_fn_404() {}
fn dummy_fn_405() {}
fn dummy_fn_406() {}
fn dummy_fn_407() {}
fn dummy_fn_408() {}
fn dummy_fn_409() {}
fn dummy_fn_410() {}
fn dummy_fn_411() {}
fn dummy_fn_412() {}
fn dummy_fn_413() {}
fn dummy_fn_414() {}
fn dummy_fn_415() {}
fn dummy_fn_416() {}
fn dummy_fn_417() {}
fn dummy_fn_418() {}
fn dummy_fn_419() {}
fn dummy_fn_420() {}
fn dummy_fn_421() {}
fn dummy_fn_422() {}
fn dummy_fn_423() {}
fn dummy_fn_424() {}
fn dummy_fn_425() {}
fn dummy_fn_426() {}
fn dummy_fn_427() {}
fn dummy_fn_428() {}
fn dummy_fn_429() {}
fn dummy_fn_430() {}
fn dummy_fn_431() {}
fn dummy_fn_432() {}
fn dummy_fn_433() {}
fn dummy_fn_434() {}
fn dummy_fn_435() {}
fn dummy_fn_436() {}
fn dummy_fn_437() {}
fn dummy_fn_438() {}
fn dummy_fn_439() {}
fn dummy_fn_440() {}
fn dummy_fn_441() {}
fn dummy_fn_442() {}
fn dummy_fn_443() {}
fn dummy_fn_444() {}
fn dummy_fn_445() {}
fn dummy_fn_446() {}
fn dummy_fn_447() {}
fn dummy_fn_448() {}
fn dummy_fn_449() {}
fn dummy_fn_450() {}
fn dummy_fn_451() {}
fn dummy_fn_452() {}
fn dummy_fn_453() {}
fn dummy_fn_454() {}
fn dummy_fn_455() {}
fn dummy_fn_456() {}
fn dummy_fn_457() {}
fn dummy_fn_458() {}
fn dummy_fn_459() {}
fn dummy_fn_460() {}
fn dummy_fn_461() {}
fn dummy_fn_462() {}
fn dummy_fn_463() {}
fn dummy_fn_464() {}
fn dummy_fn_465() {}
fn dummy_fn_466() {}
fn dummy_fn_467() {}
fn dummy_fn_468() {}
fn dummy_fn_469() {}
fn dummy_fn_470() {}
fn dummy_fn_471() {}
fn dummy_fn_472() {}
fn dummy_fn_473() {}
fn dummy_fn_474() {}
fn dummy_fn_475() {}
fn dummy_fn_476() {}
fn dummy_fn_477() {}
fn dummy_fn_478() {}
fn dummy_fn_479() {}
fn dummy_fn_480() {}
fn dummy_fn_481() {}
fn dummy_fn_482() {}
fn dummy_fn_483() {}
fn dummy_fn_484() {}
fn dummy_fn_485() {}
fn dummy_fn_486() {}
fn dummy_fn_487() {}
fn dummy_fn_488() {}
fn dummy_fn_489() {}
fn dummy_fn_490() {}
fn dummy_fn_491() {}
fn dummy_fn_492() {}
fn dummy_fn_493() {}
fn dummy_fn_494() {}
fn dummy_fn_495() {}
fn dummy_fn_496() {}
fn dummy_fn_497() {}
fn dummy_fn_498() {}
fn dummy_fn_499() {}

struct Empty360;
struct Empty361;
struct Empty362;
struct Empty363;
struct Empty364;
struct Empty365;
struct Empty366;
struct Empty367;
struct Empty368;
struct Empty369;
struct Empty370;
struct Empty371;
struct Empty372;
struct Empty373;
struct Empty374;
struct Empty375;
struct Empty376;
struct Empty377;
struct Empty378;
struct Empty379;
struct Empty380;
struct Empty381;
struct Empty382;
struct Empty383;
struct Empty384;
struct Empty385;
struct Empty386;
struct Empty387;
struct Empty388;
struct Empty389;
struct Empty390;
struct Empty391;
struct Empty392;
struct Empty393;
struct Empty394;
struct Empty395;
struct Empty396;
struct Empty397;
struct Empty398;
struct Empty399;

impl Struct110 {
    fn method(&self) -> Option<i32> { self.inner }
}

impl Struct111 {
    fn method(&self) -> Option<String> { self.inner.clone() }
}

impl Struct112 {
    fn method(&self) -> Result<i32, String> { self.inner.clone() }
}

impl Struct113 {
    fn method(&self) -> Result<String, i32> { self.inner.clone() }
}

impl Struct114 {
    fn method(&self) -> (i32, String) { self.inner.clone() }
}

impl Struct115 {
    fn method(&self) -> (bool, f32) { self.inner }
}

impl Struct116 {
    fn method(&self) -> [i32; 5] { self.inner }
}

impl Struct117 {
    fn method(&self) -> [String; 3] { self.inner.clone() }
}

impl Struct118 {
    fn method(&self) -> i32 { *self.inner }
}

impl Struct119 {
    fn method(&self) -> String { self.inner.as_ref().clone() }
}

fn function360() -> i32 { 0 }
fn function361() -> i32 { 0 }
fn function362() -> i32 { 0 }
fn function363() -> i32 { 0 }
fn function364() -> i32 { 0 }
fn function365() -> i32 { 0 }
fn function366() -> i32 { 0 }
fn function367() -> i32 { 0 }
fn function368() -> i32 { 0 }
fn function369() -> i32 { 0 }
fn function370() { }
fn function371() { }
fn function372() { }
fn function373() { }
fn function374() { }
fn function375() { }
fn function376() { }
fn function377() { }
fn function378() { }
fn function379() { }
fn function380() -> i32 { 0 }
fn function381() -> i32 { 0 }
fn function382() -> i32 { 0 }
fn function383() -> i32 { 0 }
fn function384() -> i32 { 0 }
fn function385() -> i32 { 0 }
fn function386() -> i32 { 0 }
fn function387() -> i32 { 0 }
fn function388() -> i32 { 0 }
fn function389() -> i32 { 0 }
fn function390() { }
fn function391() { }
fn function392() { }
fn function393() { }
fn function394() { }
fn function395() { }
fn function396() { }
fn function397() { }
fn function398() { }
fn function399() { }

struct Struct340 { v: i32 }
struct Struct341 { v: String }
struct Struct342 { v: bool }
struct Struct343 { v: f32 }
struct Struct344 { v: u32 }
struct Struct345 { v: i64 }
struct Struct346 { v: u64 }
struct Struct347 { v: f64 }
struct Struct348 { v: Vec<i32> }
struct Struct349 { v: Vec<String> }
struct Struct350 { v: Option<i32> }
struct Struct351 { v: Option<String> }
struct Struct352 { v: Result<i32, String> }
struct Struct353 { v: Result<String, i32> }
struct Struct354 { v: (i32, String) }
struct Struct355 { v: (bool, f32) }
struct Struct356 { v: [i32; 5] }
struct Struct357 { v: [String; 3] }
struct Struct358 { v: String }
struct Struct359 { v: Vec<u8> }

fn function400() { }
fn function401() { }
fn function402() { }
fn function403() { }
fn function404() { }
fn function405() { }
fn function406() { }
fn function407() { }
fn function408() { }
fn function409() { }
fn function410() { }
fn function411() { }
fn function412() { }
fn function413() { }
fn function414() { }
fn function415() { }
fn function416() { }
fn function417() { }
fn function418() { }
fn function419() { }
fn function420() { }
fn function421() { }
fn function422() { }
fn function423() { }
fn function424() { }
fn function425() { }
fn function426() { }
fn function427() { }
fn function428() { }
fn function429() { }
fn function430() { }
fn function431() { }
fn function432() { }
fn function433() { }
fn function434() { }
fn function435() { }
fn function436() { }
fn function437() { }
fn function438() { }
fn function439() { }
fn function440() { }
fn function441() { }
fn function442() { }
fn function443() { }
fn function444() { }
fn function445() { }
fn function446() { }
fn function447() { }
fn function448() { }
fn function449() { }
fn function450() { }
fn function451() { }
fn function452() { }
fn function453() { }
fn function454() { }
fn function455() { }
fn function456() { }
fn function457() { }
fn function458() { }
fn function459() { }
fn function460() { }
fn function461() { }
fn function462() { }
fn function463() { }
fn function464() { }
fn function465() { }
fn function466() { }
fn function467() { }
fn function468() { }
fn function469() { }
fn function470() { }
fn function471() { }
fn function472() { }
fn function473() { }
fn function474() { }
fn function475() { }
fn function476() { }
fn function477() { }
fn function478() { }
fn function479() { }
fn function480() { }
fn function481() { }
fn function482() { }
fn function483() { }
fn function484() { }
fn function485() { }
fn function486() { }
fn function487() { }
fn function488() { }
fn function489() { }
fn function490() { }
fn function491() { }
fn function492() { }
fn function493() { }
fn function494() { }
fn function495() { }
fn function496() { }
fn function497() { }
fn function498() { }
fn function499() { }
fn function500() { }
fn function501() { }
fn function502() { }
fn function503() { }
fn function504() { }
fn function505() { }
fn function506() { }
fn function507() { }
fn function508() { }
fn function509() { }
fn function510() { }
fn function511() { }
fn function512() { }
fn function513() { }
fn function514() { }
fn function515() { }
fn function516() { }
fn function517() { }
fn function518() { }
fn function519() { }
fn function520() { }
fn function521() { }
fn function522() { }
fn function523() { }
fn function524() { }
fn function525() { }
fn function526() { }
fn function527() { }
fn function528() { }
fn function529() { }
fn function530() { }
fn function531() { }
fn function532() { }
fn function533() { }
fn function534() { }
fn function535() { }
fn function536() { }
fn function537() { }
fn function538() { }
fn function539() { }
fn function540() { }
fn function541() { }
fn function542() { }
fn function543() { }
fn function544() { }
fn function545() { }
fn function546() { }
fn function547() { }
fn function548() { }
fn function549() { }
fn function550() { }
fn function551() { }
fn function552() { }
fn function553() { }
fn function554() { }
fn function555() { }
fn function556() { }
fn function557() { }
fn function558() { }
fn function559() { }
fn function560() { }
fn function561() { }
fn function562() { }
fn function563() { }
fn function564() { }
fn function565() { }
fn function566() { }
fn function567() { }
fn function568() { }
fn function569() { }
fn function570() { }
fn function571() { }
fn function572() { }
fn function573() { }
fn function574() { }
fn function575() { }
fn function576() { }
fn function577() { }
fn function578() { }
fn function579() { }
fn function580() { }
fn function581() { }
fn function582() { }
fn function583() { }
fn function584() { }
fn function585() { }
fn function586() { }
fn function587() { }
fn function588() { }
fn function589() { }
fn function590() { }
fn function591() { }
fn function592() { }
fn function593() { }
fn function594() { }
fn function595() { }
fn function596() { }
fn function597() { }
fn function598() { }
fn function599() { }
fn function600() { }
fn function601() { }
fn function602() { }
fn function603() { }
fn function604() { }
fn function605() { }
fn function606() { }
fn function607() { }
fn function608() { }
fn function609() { }
fn function610() { }
fn function611() { }
fn function612() { }
fn function613() { }
fn function614() { }
fn function615() { }
fn function616() { }
fn function617() { }
fn function618() { }
fn function619() { }
fn function620() { }
fn function621() { }
fn function622() { }
fn function623() { }
fn function624() { }
fn function625() { }
fn function626() { }
fn function627() { }
fn function628() { }
fn function629() { }
fn function630() { }
fn function631() { }
fn function632() { }
fn function633() { }
fn function634() { }
fn function635() { }
fn function636() { }
fn function637() { }
fn function638() { }
fn function639() { }
fn function640() { }
fn function641() { }
fn function642() { }
fn function643() { }
fn function644() { }
fn function645() { }
fn function646() { }
fn function647() { }
fn function648() { }
fn function649() { }
fn function650() { }
fn function651() { }
fn function652() { }
fn function653() { }
fn function654() { }
fn function655() { }
fn function656() { }
fn function657() { }
fn function658() { }
fn function659() { }
fn function660() { }
fn function661() { }
fn function662() { }
fn function663() { }
fn function664() { }
fn function665() { }
fn function666() { }
fn function667() { }
fn function668() { }
fn function669() { }
fn function670() { }
fn function671() { }
fn function672() { }
fn function673() { }
fn function674() { }
fn function675() { }
fn function676() { }
fn function677() { }
fn function678() { }
fn function679() { }
fn function680() { }
fn function681() { }
fn function682() { }
fn function683() { }
fn function684() { }
fn function685() { }
fn function686() { }
fn function687() { }
fn function688() { }
fn function689() { }
fn function690() { }
fn function691() { }
fn function692() { }
fn function693() { }
fn function694() { }
fn function695() { }
fn function696() { }
fn function697() { }
fn function698() { }
fn function699() { }
