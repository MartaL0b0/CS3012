class Node(object):
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def __lt__(self, val):
        return self.val < val

    def __gt__(self, val):
        return self.val > val

    def __eq__(self, val):
        return self.val == val

    def __str__(self):
        return "[Node val: %d]" % self.val  

class Tree(object):
    def __init__(self):
        self.root = None

    def put(self, val):
        self.root = self._put(self.root, val)

    def _put(self, node, val):
        if node is None:
            node = Node(val)

        if val < node:
            node.left = self._put(node.left, val)
        elif val > node:
            node.right = self._put(node.right, val)
        else:
            node.val = val

        return node

    #def get(self, val):
     #   return self._get(self.root, val)  # coverage

    def _get(self, node, val):
        while not node is None:
            if val < node:
                node = node.left
            elif val > node:
                node = node.right
            else:
                return node.val

        return None

    # This method returns `None` if no common is found
    def find_common_ancestor(self, a, b):
        return self._find_common_ancestor(self.root, a, b)

    def _find_common_ancestor(self, node, a, b):
        # Traverse right until a diverge occurs
        if a > node and b > node:
            if node.right is None:
                return None  # coverage

            # if right node is `a` or `b` then we found common
            if node.right == a or node.right == b:
                return node.val

            return self._find_common_ancestor(node.right, a, b)

        # Traverse left until a diverge occurs
        elif a < node and b < node:
            if node.left is None:
                return None  # coverage

            # if left node is `a` or `b` then we found common
            if node.left == a or node.left == b:
                return node.val

            return self._find_common_ancestor(node.left, a, b)

        # root does not have any common ancestor
        # This test is later because we dont want the
        # recursion to hit it every time
        elif a == self.root or b == self.root:
            return None  # coverage says no but it's covered by 

        else:
            # A diverge of the tree traversal occurs here
            # So the current node is a potential common ancestor
            # Verify that a and b are legitimate nodes
            if self._node_exists(node, a):
                # `a` exists ensure `b` exists
                if self._node_exists(node, b):
                    # Common ancestor is validated
                    return node.val
                else:
                    return None  # coverage
            else:
                return None

    #def node_exists(self, val):
    #    return self._node_exists(self.root, val)  # coverage

    def _node_exists(self, node, val):
        return not self._get(node, val) is None

   
    def traverse(self, root):
        current_level = [root]
        count = 0
        while current_level:
            print(' '.join(str(node) for node in current_level))
            next_level = list()
            for n in current_level:
                if n.left:
                    next_level.append(n.left)
                if n.right:
                    next_level.append(n.right)
                current_level = next_level
                count += 1
        return count

if __name__ == "__main__":
    from sys import stdout
    vals = [30, 8, 52, 3, 20, 10, 29, 62]
    tree = Tree()
    [tree.put(val) for val in vals]
    pairs = [
        (3, 20),
        (3, 29),
        (10, 29),
        (20, 52),
        (3, 62),
        (4, 29),
        (3, 1),
        (8, 3),
        (8, 20)
    ]
    
    tree.traverse(tree.root)
    print()
    
    for (a, b) in pairs:
        stdout.write("Common for %d & %d: " % (a, b))
        print(tree.find_common_ancestor(a, b))

