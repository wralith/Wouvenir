export default {
  port: 1337,
  origin: 'http://localhost:3000',
  dbUri: 'mongodb://127.0.0.1:27017/wouvenir-db',
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGB35Hj8HkIRMv/TEfKb16qY3TNy
dX0ZFc9tim6JkxDb7PF/GRw2JUqiEZiN+OdQxE9srUlw11ErLX1Yofuq/QddjFj6
X9tIGjmIhNnH8ktaFzzftkC4MiFNTW2To4V2kLOAUvi/sVfXdF/vwP1K6f0/ldUF
LfzWZRp0GP10C4m1AgMBAAE=
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgGB35Hj8HkIRMv/TEfKb16qY3TNydX0ZFc9tim6JkxDb7PF/GRw2
JUqiEZiN+OdQxE9srUlw11ErLX1Yofuq/QddjFj6X9tIGjmIhNnH8ktaFzzftkC4
MiFNTW2To4V2kLOAUvi/sVfXdF/vwP1K6f0/ldUFLfzWZRp0GP10C4m1AgMBAAEC
gYBF6Hx8pJA05ovj0ozOGNu4eGDMuKSlzHj+we4w3qfh7s6Nz8JdrGtn430G5dO7
pc8tk58cepa+7qBflsyEOcx1FTuXIVOhvNe+TdqSsJY+CrAxcqhWBInRhedIvJtG
8ChFHa6kKGW/7NownbxgLJ423horuAsgQHNMk4YQyejAAQJBALM73oMy9qgeZFUX
YgQir0rmuO6aiaOIEu4QvrPIsbl7Ob+v7Qp8Pu7JjfwASKX6vv5L6EYLeRESj/h1
SDjkcAECQQCJyS5CJEz2OFO2cFD8hxoKgm45qZVX/VdBXX7f613tM6H20jjjjEyg
D0rNaAwIBZEqmzdlMZLT/eRcevNPmFm1AkBp+E/LCmrDY5S2qqiNAWTayCc3C6+t
PFrU3pmh+lr5611tdDqWJHeg/xIvmItbdzFNcNvX7hiae3sbz1vwJ0ABAkApNRGw
lkquGIpwtYaC/6S6H+f3NtCDUDEYS232ad3dYuO9fYGmC/+envQwGj3+6CtSIrme
egT/gZ8aSWsbEuVBAkAva5fseq1s/a8PZhReoKYYnaeKh8lZbVcE130I7HLHPen4
/S4OrI6qDaOZ11QiY7XxPhim5S7RLxuxBvgntiOS
-----END RSA PRIVATE KEY-----`,
}

