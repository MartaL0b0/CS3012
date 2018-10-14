from networkx import networkx as nx

G = nx.DiGraph()  # Directed graph
G.add_nodes_from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
G.add_edges_from([(2, 1), (3, 1), (4, 1), (5, 2), (6, 2), (7, 3), (8, 3), (9, 3),
                  (10, 4), (10, 12), (14, 9), (15, 8), (12, 11), (13, 11), (14, 12), (15, 13)])

if __name__ == "__main__":
    print(nx.algorithms.lowest_common_ancestor(G, 1, 11))




