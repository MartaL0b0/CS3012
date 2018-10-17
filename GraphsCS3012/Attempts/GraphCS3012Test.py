import unittest 
from GraphCS3012 import Node, Composite, traverse

class TestDAGClasses(unittest.TestCase):
    def setUp(self):
        self.root_node = Composite()
        self.leaf_a = Composite()
        self.leaf_b = Node()
        self.root_node.add(self.leaf_a, self.leaf_b)

    def testAddComposite(self):
        self.root_node.add(Composite())
        self.assertTrue(len(self.root_node.children) == 3)

    def testGetMethod(self):
        self.assertTrue(Node.get(self.leaf_a._id) is self.leaf_a)

    def testRemove(self):
        self.root_node.remove(self.leaf_a, self.leaf_b)
        self.assertTrue(self.leaf_a not in self.root_node.children)
        self.assertTrue(self.leaf_b not in self.root_node.children)

    def testOrdering(self):
        self.root_node.add(self.leaf_b, self.leaf_a)
        self.assertTrue(self.root_node.children[-1] is self.leaf_a)

    def testTraverse(self):
        processing_order = []

        def callback(node):
            processing_order.append(node)

        leaf_c = Node()
        self.leaf_a.add(leaf_c)
        traverse(self.root_node, callback)
        self.assertTrue(processing_order == [
                        self.root_node, self.leaf_a, leaf_c, self.leaf_b])

    def testLCAgetAncestors(self):
        #test for 1 node it retrieves all the ancestors
    
    def testLCAgetCommons(self):
        #test for 2 nodes there are common ancestors

    def testLCAgetLowestCommon(self):
        #test for 2 nodes it gets the lowest common

    def testLCAfullFlow2(self):
        #full functionality for nodes 1 and 2

    def testLCAfullFlow2(self):
        #full functionality for nodes 3 and 4

    def testLCAfullFlow3(self):
        #full functionality for nodes 4 and 8

    def testLCAfullFlow4(self):
        #full functionality for nodes 5 and 7

if __name__ == '__main__':
    unittest.main()