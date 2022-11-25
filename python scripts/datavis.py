import matplotlib.pyplot as plt

import dataxtract

X1,Y1 = dataxtract.allpts()
X2,Y2 = dataxtract.alternatepairs()

plt.scatter(X1, Y1,color="black")
plt.show()

#plt.scatter(X2, Y2,color="black")
#plt.show()