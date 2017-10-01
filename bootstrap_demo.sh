composer-rest-server -p hlfabric -n greenblockone -i admin -s adminpw -N always -w true &

sleep 5

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "org.greenblock.model.Regulator", \ 
      "name": "EPA" \ 
       }' 'http://localhost:3000/api/org.greenblock.model.Regulator'
       
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "org.greenblock.model.Corporation", \ 
      "name": "GreenCorp" \ 
       }' 'http://localhost:3000/api/org.greenblock.model.Corporation'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "org.greenblock.model.GreenCredit", \ 
      "name": "EnergyCredit2017", \ 
       "quantity": 0, \ 
         "entity": "resource:org.greenblock.model.Regular#EPA" \ 
   }' 'http://localhost:3000/api/org.greenblock.model.GreenCredit'

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \ 
   "$class": "org.greenblock.model.GreenCredit", \ 
      "name": "GreenCorp", \ 
       "quantity": 0, \ 
         "entity": "resource:org.greenblock.model.Corporation#GreenCorp" \ 
   }' 'http://localhost:3000/api/org.greenblock.model.GreenCredit'

cd Regulator-frontend && python -m http.server 8001 &
cd Owner-frontend && python -m http.server 8000
