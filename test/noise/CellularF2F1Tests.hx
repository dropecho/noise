package noise;

import utest.Assert;
import dropecho.noise.CellularF2F1;

class CellularF2F1Tests extends utest.Test {
	public function test_output_is_always_non_negative() {
		var c = new CellularF2F1(1);
		for (i in 0...50) {
			var v = c.value(i * 0.37, i * 0.19);
			Assert.isTrue(v >= 0, 'Expected >= 0, got $v');
		}
	}

	public function test_output_is_finite() {
		var c = new CellularF2F1(1);
		for (i in 0...20) {
			var v = c.value(i * 0.5, i * 0.3);
			Assert.isFalse(Math.isNaN(v));
		}
	}

	public function test_differs_from_worley() {
		// F2-F1 produces a different pattern than F1 alone (Worley)
		var f2f1 = new CellularF2F1(1);
		var worley = new dropecho.noise.Worley(1);
		var anyDifferent = false;
		for (i in 1...20) {
			if (f2f1.value(i * 0.4, i * 0.6) != worley.value(i * 0.4, i * 0.6)) {
				anyDifferent = true;
				break;
			}
		}
		Assert.isTrue(anyDifferent);
	}
}
