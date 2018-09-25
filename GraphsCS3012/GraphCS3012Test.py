import unittest 
import GraphCS3012


class Test_TestFindLCA(unittest.TestCase):

    def test_findLCA(self):
        root = GraphCS3012.Node(1)
        root.left = GraphCS3012.Node(2)
        root.right = GraphCS3012.Node(3)
        root.left.left = GraphCS3012.Node(4)
        root.left.right = GraphCS3012.Node(5)
        root.right.left = GraphCS3012.Node(6)
        root.right.right = GraphCS3012.Node(7)
        self.assertEquals(GraphCS3012.findLCA(root, 5,6), 1)


if __name__ == '__main__':
    unittest.main()
