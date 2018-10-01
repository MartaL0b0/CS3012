import unittest 
from GraphCS3012 import Node
from GraphCS3012 import Tree

class Test_Find_Common(unittest.TestCase):

    def setUp(self):
        vals = [3, 1, 2, 5, 4, 7, 6, 8]
        self.tree = Tree()
        [self.tree.put(val) for val in vals]

    def test_Treefind_common_root(self):
        #if one of the nodes is root then I consider it to not be a common ancestor.
        self.assertEqual(None, Tree.find_common_ancestor(self.tree, 3, 1))
        
    def test_Treefind_common_different_subtrees(self):
        #different subtrees, it should be the closest 'root'
        self.assertEqual(5, Tree.find_common_ancestor(self.tree, 8, 4))
    
    def test_Treefind_common_same_subtree(self):
        #same subtree, it should be parent
        self.assertEqual(7, Tree.find_common_ancestor(self.tree, 6, 8))

    def test_Treefind_common_different_levels(self):
        #different subtrees and different levels, it should be the root
        self.assertEqual(3, Tree.find_common_ancestor(self.tree, 7, 1))
    
    def test_Treefind_common_parent_and_child(self):
        #parent and child, common ancestor the 'grandparent'
        self.assertEqual(5, Tree.find_common_ancestor(self.tree, 7, 8))

    def test_TreeFind_common_nodes_not_on_tree(self):
        #test with nodes that are not in the tree, it should be None
        self.assertEqual(None, Tree.find_common_ancestor(self.tree, 9, 15))
      
    def test_TreeFind_common_one_node_not_on_tree(self):
        #if only one of the nodes is in the tree, then the common ancestor is the root, since we could assume the other 
        #could be added at some point. 
        self.assertEqual(None, Tree.find_common_ancestor(self.tree, -5, 15))

    def test_TreeFind_common_traverse(self):
        self.assertEqual(8, Tree.traverse(self.tree, self.tree.root))

if __name__ == '__main__':
    unittest.main()
