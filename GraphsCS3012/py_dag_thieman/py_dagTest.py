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

    def testAddEdge(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1,2)
        self.assertTrue(self.dag.graph == {1: set([2]), 2: set()})

if __name__ == '__main__':
    unittest.main()
