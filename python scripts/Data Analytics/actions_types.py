import json
#Data Analytics\incidents_test.json
f=open("Data Analytics\\incidents_test.json")
data=json.load(f)

crimes = {}

for i in data:
    try:
        crimes[i["category"]] += 1
    except:
        crimes[i["category"]] = 1

"""
for i in crimes:
    print(i,":",crimes[i])
"""

import matplotlib.pyplot as plt
import numpy as np

mylabels = []
count = []

for i in crimes:
    mylabels.append(i)
    count.append(crimes[i])

"""
myexplode = []
z=0.1
odev = 0

for i in crimes:
    mylabels.append(i)
    count.append(crimes[i])
    if(odev%2 == 0):
        myexplode.append(z)
    else:
        myexplode.append(0)
    odev += 1
    #print(i,":",crimes[i])
"""

#"""
l = len(mylabels)
for i in range(l):
    for j in range(i+1,l):
        if(count[i]>count[j]):
            temp = count[i]
            count[i] = count[j]
            count[j] = temp

            temp2 = mylabels[i]
            mylabels[i] = mylabels[j]
            mylabels[j] = temp2

[print(mylabels[i],count[i]) for i in range(l)]
#"""
myexplode = [0 for x in range(l)]
myexplode[-1] = 0.15

disp_cnt = 0
if(l<5):
    disp_cnt = l
else:
    disp_cnt = 5

#"""
for i in range(l):
    mylabels[i] = mylabels[i].upper() +" : "+ str(count[i])
#"""

#"""
count = count[::-1]
mylabels = mylabels[::-1]
myexplode = myexplode[::-1]
#"""

new_count = count[0:disp_cnt+1]
new_lables = mylabels[0:disp_cnt+1]
new_explode = myexplode[0:disp_cnt+1]

s1 = sum(new_count)
s2 = sum(count)
new_count.append(s2-s1)
new_lables.append("Other Crimes")
new_explode.append(0)

plt.rcParams.update({'font.size': 15}) #Change font size of every text in plot
plt.pie(new_count, labels = new_lables, explode = new_explode, startangle = 0, autopct="%0.2f%%", shadow = True)

#plt.pie(count[0:disp_cnt+1], labels = mylabels[0:disp_cnt+1], explode=myexplode[0:disp_cnt+1], startangle = 0, autopct="%0.2f%%", shadow = True)

#print(mylabels[0:disp_cnt+1])
#plt.pie(count, labels = mylabels) #No displacement
#plt.pie(count, labels = mylabels, explode=myexplode, startangle = 0) #, shadow = True) #incremental displacement
#plt.legend()
plt.show()
#print(crimes)