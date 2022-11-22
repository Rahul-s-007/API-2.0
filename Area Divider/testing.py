import http.client

conn = http.client.HTTPSConnection("data.police.uk")
payload = ''
headers = {}
polly = ""
conn.request("POST", f"/api/crimes-street/all-crime?poly{polly}=&date=2022-01", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))