p = [51.2867601,51.6918741,-0.5103751,0.3340155]
# p = [x1,x2,y1,y2]
# x1,y1
# x1,y2
# x2,y1
# x2,y2
ans = []

def checkArea(pt):
    #print(pt)
    #[[51.2867601, 0.3340155], [51.2867601, -0.08817979999999997], [51.4893171, -0.08817979999999997], [51.4893171, 0.3340155]]
    v1 = pt[0]
    v2 = pt[1]
    v3 = pt[2]
    v4 = pt[3]

    wid = abs(v1[0]-v3[0])
    hei = abs(v1[1] - v3[1])

    area = wid * hei

    if(area <= 0.005): #try 0.05 and you can observe that number of sub boxes reduces
        return pt
    else:
        return split4(pt)


def split4(pt):
    """
    v1 = [pt[0],pt[2]]
    v2 = [pt[0],pt[3]]
    v3 = [pt[1],pt[2]]
    v4 = [pt[1],pt[3]]
    """
    v1 = pt[0]
    v2 = pt[1]
    v3 = pt[2]
    v4 = pt[3]

    lst = genCoord(v1,v2,v3,v4)

    for i in lst:
        ans.append(checkArea(i))



def genCoord(v1,v2,v3,v4):
    
    m1 = [(v1[0] + v2[0])/2, (v1[1] + v2[1])/2]
    m2 = [(v2[0] + v3[0])/2, (v2[1] + v3[1])/2]
    m3 = [(v3[0] + v4[0])/2, (v3[1] + v4[1])/2]
    m4 = [(v4[0] + v1[0])/2, (v4[1] + v1[1])/2]
    centre = [(v1[0] + v3[0])/2, (v1[1] + v3[1])/2]

    #print(v1,v2,v3,v4)
    #print(m1,m2,m3,m4)
    #print(centre)
    #print()

    ss1 = [v1,m1,centre,m4]
    ss2 = [m1,v2,m2,centre]
    ss3 = [centre,m2,v3,m3]
    ss4 = [m4,centre,m3,v4]

    tt = [ss1,ss2,ss3,ss4]
    #print(tt)
    return tt



def pairs4(ptp):
    pt = [0,0,0,0]
    if(ptp[0]>ptp[1]):
        pt[0] = ptp[1]
        pt[1] = ptp[0]
    else:
        pt[0] = ptp[0]
        pt[1] = ptp[1]

    if(ptp[2]<ptp[3]):
        pt[2] = ptp[3]
        pt[3] = ptp[2]
    else:
        pt[2] = ptp[2]
        pt[3] = ptp[3]
    
    v1 = [pt[0],pt[2]]
    v2 = [pt[0],pt[3]]
    
    v4 = [pt[1],pt[2]] # not a mistake
    v3 = [pt[1],pt[3]]
    
    return [v1,v2,v3,v4]

coordpairlst = pairs4(p)
small_squares = checkArea(coordpairlst)
print(ans)

print("-------")

#ans_wo_none = [i for i in ans if i is not None]
#print(ans_wo_none)


import matplotlib.pyplot as plt

for i in ans:
    if i is not None:
        for j in i:
            plt.plot(j[0],j[1],'r*')
            #print(j[0],j[1])

plt.show()



"""
coordpairlst = pairs4(p)
print(coordpairlst)

print("---------------")

test = genCoord([51.2867601, 0.3340155], [51.2867601, -0.5103751], [51.6918741, -0.5103751], [51.6918741, 0.3340155])
#for i in test:
#    print(i)
#print(test)

#small_squares = checkArea(coordpairlst)
#print(ans)
"""