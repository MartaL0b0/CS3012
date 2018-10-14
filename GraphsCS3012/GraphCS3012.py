import weakref
from collections import deque

class Node(object):
    """
    A node in a graph.
    """
    _instances = weakref.WeakValueDictionary()
    _instance_count = 1

    def __new__(cls, *args, **kw):
        instance = object.__new__(cls, *args, **kw)
        instance._id = Node._instance_count
        Node._instances[instance._id] = instance
        Node._instance_count += 1
        return instance

    @classmethod
    def get(cls, id):
        """
        Returns a node by its _id attribute.
        """
        return cls._instances[id]

    def __repr__(self):
        return "<%s #%s object>" % (self.__class__.__name__, self._id)


class Composite(Node):
    """
    A node in a graph, composed of other nodes.
    """

    def __init__(self, *children):
        self.children = list(children)

    def add(self, *nodes):
        self.children.extend(nodes)

    def remove(self, *nodes):
        for i in nodes:
            self.children.remove(i)
    
    def __repr__(self):
        return "<%s #%s object>" % (self.__class__.__name__, self._id)

def traverse(root, dispatch):
    """
    Traverse down the tree, processing nodes from left to right, calling dispatch on each node.
    """
    stack = deque([root])
    stack_pop = stack.popleft
    stack_extend = stack.extend
    stack_rotate = stack.rotate
    while stack:
        node = stack_pop()
        dispatch(node)
        if hasattr(node, 'children'):
            stack_extend(node.children)
            stack_rotate(len(node.children))

def lowest_common_ancestor(node1, node2):
    #algorithm: 
        #1 - find ancestors from both
        #2 - find commons
        #3 - find lowest common

if __name__ == "__main__":
    from sys import stdout
    print('creating dag')

    #create a graph that looks like the one in the README file.
    node_1 = Composite()
    node_2 = Composite()
    node_3 = Composite()
    node_4 = Composite()
    node_5 = Composite()
    node_6 = Composite()
    node_7 = Composite()
    node_8 = Composite() #because it is the only one without children

    node_7.add(node_8)
    node_6.add(node_8)
    node_5.add(node_8)
    node_4.add(node_5, node_6, node_7)
    node_3.add(node_4)
    node_2.add(node_4)
    node_1.add(node_4)

    processing_order = []
    def callback(node):
            processing_order.append(node)

    traverse(node_5, callback)
    print('processing order from 5: ')
    for (node) in processing_order:
        stdout.write(" --> %s" % node)


    

