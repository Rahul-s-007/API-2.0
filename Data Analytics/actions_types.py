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

for i in crimes:
    print(i,":",crimes[i])
#print(crimes)