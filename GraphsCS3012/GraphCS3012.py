import weakref
from collections import deque

class Node(object):
    """
    A node in a graph.
    """
    _instances = weakref.WeakValueDictionary()
    _instance_count = 0

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


if __name__ == "__main__":
   print('creating dag')
