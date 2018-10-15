""" Tests on the DAG implementation """
import unittest
import py_dag

class TestPyDag(unittest.TestCase):
    def setUp(self):
        self.dag = py_dag.DAG()
        
    def testAddNode(self):
        self.dag.add_node(1)
        self.assertTrue(self.dag.graph == {1: set()})

    def testAddDuplicatedNode(self):
        self.dag.add_node(1)
        with self.assertRaises(KeyError):
            self.dag.add_node(1)
    
    def testDeleteNode(self):
        self.dag.add_node(1)
        self.dag.delete_node(1)
        self.assertTrue(self.dag.graph == {})

    def testDeleteNonExistingNode(self):
        self.dag.add_node(1)
        with self.assertRaises(KeyError):
            self.dag.delete_node(2)

    def testDeleteNodeIfExists(self):
        self.dag.add_node(1)
        self.assertTrue(self.dag.graph == {1: set()})
        self.dag.delete_node_if_exists(2)
        self.assertTrue(self.dag.graph == {1: set()})
        #nothing should happen: pass can not be tested explicitly

    def testAddEdge(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1,2)
        self.assertTrue(self.dag.graph == {1: set([2]), 2: set()})

    def testAddEdgeNonExistingNodes(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        with self.assertRaises(KeyError): 
            self.dag.add_edge(1, 3)

        
            


    def testDeleteEdge(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1, 2)
        self.dag.delete_edge(1, 2)
        self.assertTrue(self.dag.graph == {1: set(), 2: set()})

   # def testDeleteNonExistingEdge(self):



if __name__ == '__main__':
    unittest.main()
