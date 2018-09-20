import unittest 
import GraphCS3012

class Test_TestAddTwo(unittest.TestCase):
    def test_addTwo(self):
        self.assertEquals(GraphCS3012.addTwo(5), 7)

    def test_addTowNeg(self):
        self.assertEquals(GraphCS3012.addTwo(-1), 1)

if __name__ == '__main__':
    unittest.main()
