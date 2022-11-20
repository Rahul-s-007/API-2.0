import json

f=open("result.json")
data=json.load(f)
#print(data)

lat = []
lon = []

alt_lat = []
alt_lon = []

ans = ""
cnt = 0
num_pts = 0
# lat,lon,<point_name>,#000000


for i in data:
    lat.append(float(i["latitude"]))
    lon.append(float(i["longitude"]))
    if(cnt%2==0):
        alt_lat.append(float(i["latitude"]))
        alt_lon.append(float(i["longitude"]))
        num_pts += 1
    cnt += 1
print("Total lat,lon pairs:",num_pts)


with open('plotqwery.txt', 'w') as f:
    for i in range(0,num_pts):
        ans = f"{alt_lat[i]},{alt_lon[i]},p{i+1},#000000"
        f.write(ans+"\n")