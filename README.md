## IO-Smart-Wallet

Official IO-Smart-Wallet prototype version 1 for Zerium Project

## Demo Prototype

Demo is available at 
https://zerium-linanayail.c9users.io/


## Install and Start Ionic 3 IO-Smart-Wallet app

If the folder exist, remove it:
```
sudo rm -R IO-Smart-Wallet/ 
```

Clone Repository
```
git clone https://github.com/diegoenriquesantos/IO-Smart-Wallet.git 
```

Change Permissions
```
sudo chmod 777 IO-Smart-Wallet/
```

Change Directory to the folder project
```
cd IO-Smart-Wallet/
```

Npm Install
```
npm install
```

```
npm install --save-dev @ionic/app-scripts@latest
```

Start Ionic Server
```
ionic serve -p $PORT --no-livereload
```
or 

```
ionic serve -p 8080 --no-livereload
```


## Generate apk file to deploy in Android device
``` 
cordova platform rm android  (if the Android platform is currently incorporated)
cordova platform add android	
cordova build android
```

# Donations
Do you like this prototype ? Let me know: diego.enrique.santos@gmail.com :)

Ethereum: 0xf87bb921423ccbc6668002c7ed0c99bfd1fa86da
