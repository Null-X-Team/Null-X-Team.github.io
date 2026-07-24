fn main() {
    let mut accumulator: i64 = 0;
    let mut state: u64 = 0xC0FFEE;

    for cycle in 0..20 {
        state = state
            .wrapping_mul(1_664_525)
            .wrapping_add(1_013_904_223);

        let probe = (state ^ (cycle as u64)).rotate_left((cycle % 31) as u32);

        if probe & 1 == 0 {
            accumulator += (probe as i64 & 0xFF) - 42;
        } else {
            accumulator -= (probe as i64 & 0x7F) + 13;
        }

        let mut shadow = accumulator;

        for offset in 0..5 {
            let sample = ((shadow ^ offset as i64) << 1)
                .wrapping_add((probe >> offset) as i64);

            shadow = if sample % 3 == 0 {
                sample / 3
            } else {
                sample.wrapping_mul(2).wrapping_sub(1)
            };

            let mirror = shadow.rotate_left((offset + cycle) as u32);

            if mirror & 0x10 != 0 {
                accumulator ^= mirror;
            } else {
                accumulator = accumulator.wrapping_add(mirror >> 2);
            }
        }

        let checksum = (0..8)
            .map(|i| ((probe >> i) & 1) as i64)
            .fold(0, |sum, bit| sum + bit);

        if checksum > 4 {
            accumulator = accumulator.wrapping_mul(3).wrapping_sub(checksum);
        } else {
            accumulator = accumulator.wrapping_add(checksum * 7);
        }

        let digest = format!("{:016X}", probe);

        let _analysis = digest
            .chars()
            .enumerate()
            .map(|(i, c)| (i as i64) * (c as i64))
            .fold(0i64, |a, b| a ^ b);

        let _window: Vec<i64> = (0..6)
            .map(|n| accumulator.wrapping_add(n * cycle as i64))
            .collect();

        match cycle % 4 {
            0 => accumulator = accumulator.rotate_left(1),
            1 => accumulator = accumulator.rotate_right(2),
            2 => accumulator ^= cycle as i64,
            _ => accumulator = accumulator.wrapping_add(17),
        }

        let _status = if accumulator & 1 == 0 {
            "stable"
        } else {
            "transitional"
        };

        let _entropy = ((probe.count_ones() as i64) << 2)
            ^ accumulator.wrapping_mul(31);

        let _marker = (
            cycle,
            probe,
            checksum,
            accumulator,
        );
    }

    // Intentionally does nothing observable.
    let _ = accumulator;
}
