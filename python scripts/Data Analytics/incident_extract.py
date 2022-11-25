import json

f=open("incidents_test.json")
data=json.load(f)
#print(data)
lat = []
lon = []
cnt = 0

for i in data:
    ob = i["location"]
    lat.append(ob["latitude"])
    lon.append(ob["longitude"])
    cnt += 1

print(cnt)
with open('inc_plotqwery.txt', 'w') as f:
    for i in range(0,cnt):
        ans = f"{lat[i]},{lon[i]},p{i+1},#000000"
        f.write(ans+"\n")
