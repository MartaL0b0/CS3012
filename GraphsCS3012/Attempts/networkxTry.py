import networkx as nx

G = nx.DiGraph()  # Directed graph
G.add_nodes_from([1, 2, 3, 4, 5, 6, 7])
edges = [(1, 2), (2, 3), (3, 4), (4, 7), (5, 6), (6, 7), (2, 5)]
G.add_edges_from([(e[1], e[0]) for e in edges])
print(nx.algorithms.lowest_common_ancestor(G, 1, 5))






