import json

f=open("result.json")
data=json.load(f)
#print(data)

lat = []
lon = []
ans = ""
cnt = 0

#-----------------------------------------------
def allpts():
    global lat
    global lon
    global ans
    global cnt

    lat = []
    lon = []
    ans = ""
    cnt = 0

    #All points
    for i in data:
        lat.append(float(i["latitude"]))
        lon.append(float(i["longitude"]))
        ans += f"{lat[cnt]},{lon[cnt]}:"
        cnt += 1

    print("Total lat,lon pairs:",cnt)

    return lat,lon

#-----------------------------------------------
def alternatepairs():
    global lat
    global lon
    global ans
    global cnt
    global num_pts

    lat = []
    lon = []
    ans = ""
    cnt = 0
    num_pts = 0

    #Alternate pairs
    for i in data:
        lat.append(float(i["latitude"]))
        lon.append(float(i["longitude"]))
        if(cnt%2==0):
            ans += f"{lat[cnt]},{lon[cnt]}:"
            num_pts += 1
        cnt += 1

    print("Total lat,lon pairs:",num_pts)
    return lat,lon

#-----------------------------------------------
def writetxtfile():
    global ans
    #print(ans[0:-1])
    with open('pairs.txt', 'w') as f:
        f.write(ans[0:-1])

"""
#-----------------------------------------------
def main():
    allpts()
    #alternatepairs()
    writetxtfile()

if __name__ == "__main__":
    main()
"""


"""
#xlat,ylon = alternatepairs()
#print(xlat)
#print(ylon)
#print(lat)
#print(lon)
#size = 51.51 60 82 52 54 72  = 14 digits, 1 dot = 15 characters
#pair size = 15*2 + 1 colon + 1 comma = 32
"""