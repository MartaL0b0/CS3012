import unittest 
import GraphCS3012


class Test_TestFindLCA(unittest.TestCase):
    def test_findLCA(self):
        root = GraphCS3012.Node(1)
        self.assertEquals(GraphCS3012.findLCA(root, 5,6), 1)


if __name__ == '__main__':
    unittest.main()
