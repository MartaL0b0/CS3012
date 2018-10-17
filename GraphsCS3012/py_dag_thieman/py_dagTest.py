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
        with self.assertRaises(KeyError) as ex:
            self.dag.add_node(1)

        err = ex.exception
        self.assertEqual(str(err), "'node 1 already exists'")

    def testAddNodeIfNotExists(self):
        self.dag.add_node(1)
        self.dag.add_node_if_not_exists(1)
        self.dag.add_node_if_not_exists(2)
        self.assertTrue(self.dag.graph == {1: set(), 2: set()})
        #nothing should happen: pass can not be tested explicitly
    
    def testDeleteNode(self):
        self.dag.add_node(1)
        self.dag.delete_node(1)
        self.assertTrue(self.dag.graph == {})

    def testDeleteNonExistingNode(self):
        self.dag.add_node(1)
        with self.assertRaises(KeyError) as ex:
            self.dag.delete_node(2)

        err = ex.exception
        self.assertEqual(str(err), "'node 2 does not exist'")

    def testDeleteNodeIfExists(self):
        self.dag.add_node(1)
        self.assertTrue(self.dag.graph == {1: set()})
        self.dag.delete_node_if_exists(2)
        self.assertTrue(self.dag.graph == {1: set()})
        #nothing should happen: pass can not be tested explicitly

    def testResetGraph(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.reset_graph()
        self.assertTrue(self.dag.graph == {})

    def testAddEdge(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1,2)
        self.assertTrue(self.dag.graph == {1: set([2]), 2: set()})

    def testAddEdgeNonExistingNodes(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        with self.assertRaises(KeyError) as ex: 
            self.dag.add_edge(1, 3)

        err = ex.exception
        self.assertEqual(str(err), "'one or more nodes do not exist in graph'")

    def testAddEdgeCreateCycle(self):
        #TODO: fix this, is not working as expected
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_node(3)
        self.dag.add_edge(1, 2)
        self.dag.add_edge(2, 3)
        with self.assertRaises(py_dag.DAGValidationError):
            self.dag.add_edge(3, 1)
        self.assertTrue(self.dag.graph == {1: set([2]), 2: set([3]), 3: set()})

    def testDeleteEdge(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1, 2)
        self.dag.delete_edge(1, 2)
        self.assertTrue(self.dag.graph == {1: set(), 2: set()})

    def testDeleteNonExistingEdge(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1, 2)
        with self.assertRaises(KeyError) as ex: 
            self.dag.delete_edge(1, 3)

        err = ex.exception
        self.assertEqual(str(err), "'this edge does not exist in graph'")

    def testPredecessorsOnlyOne(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1, 2)
        self.assertEqual(self.dag.predecessors(2), [1])
    
    def testPredecessorsMoreThanOne(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_node(3)
        self.dag.add_node(4)
        self.dag.add_edge(1, 2)
        self.dag.add_edge(3, 2)
        self.dag.add_edge(4, 2)
        self.assertEqual(self.dag.predecessors(2), [1, 3, 4])
    
    def testPredecessorsRoot(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_edge(1, 2)
        self.assertEqual(self.dag.predecessors(1), [])

    def testPredecessorsMoreLevels(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_node(3)
        self.dag.add_edge(1, 2)
        self.dag.add_edge(2, 3)
        self.assertEqual(self.dag.predecessors(3), [2])

    def testFromDict(self):
        self.dag.add_node(1)
        dict1 = {2: [3, 4], 3: [], 4: [3]}
        self.dag.from_dict(dict1)
        self.assertTrue(self.dag.graph == {
                        2: set([3, 4]), 3: set(), 4: set([3])})

    def testFromDictWrongFormat(self):
        self.dag.add_node(1)
        dict2 = {2: set([3, 4]), 3: set(), 4: set([3])}
        with self.assertRaises(TypeError) as ex:
            self.dag.from_dict(dict2)

        err = ex.exception
        self.assertEqual(str(err), 'dict values must be lists')

    def testIndependentNodes(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_node(3)
        self.dag.add_edge(1, 2)
        self.dag.add_edge(2, 3)
        self.assertEqual(self.dag.ind_nodes(), [1])

    def testIndependentNodesMoreThanOne(self):
        dict1 = {1: [4], 2: [4], 3: [4], 4: [
            5, 6, 7], 5: [8], 6: [8], 7: [8], 8: []}
        self.dag.from_dict(dict1)
        self.assertEqual(self.dag.ind_nodes(), [1, 2, 3])
       
    def testSizeEmpty(self):
        self.assertEqual(self.dag.size(), 0)

    def testSizeAdd(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.add_node(3)
        self.assertEqual(self.dag.size(), 3)

    def testSizeAddDelete(self):
        self.dag.add_node(1)
        self.dag.add_node(2)
        self.dag.delete_node(2)
        self.assertEqual(self.dag.size(), 1)

if __name__ == '__main__':
    unittest.main()
