## Step 1

Create a Ionic 3 project:
**ionic start zerium-test blank**

Would you like to integrate your new app with Cordova to target native iOS and Android?

Response with y

Install the free Ionic Pro SDK and connect your app?

Response with Y

Email: any (can be completed later with ionic signup)

Password: any (can be completed later with ionic signup)

## Step 2

From the workspace path execute the following command:
**git clone git@gitlab.com:diego.enrique.santos/zrm-io-smartwallet.git**

## Step 3

If the following directory exist, please remove with the following commands:

**sudo rm -R zerium-test/resources/**

**sudo rm -R zerium-test/src/**

**sudo rm zerium-test/package.json**

**sudo rm zerium-test/.editorconfig**

**sudo rm zerium-test/.gitignore**

**sudo rm zerium-test/config.xml**


## Step 4

**cd zrm-io-smartwallet/**

**sudo mv resources ../zerium-test/**

**sudo mv src ../zerium-test/**

**sudo mv www ../zerium-test/**

**sudo mv package.json ../zerium-test/**

**sudo mv zerium-test/.editorconfig**

**sudo mv zerium-test/.gitignore**

**sudo mv zerium-test/config.xml**

## Step 5

**cd ..**

**sudo rm -R zrm-io-smartwallet/**

## Step 6

**sudo mv zerium-test zrm-io-smartwallet**

**cd zrm-io-smartwallet/**

**ionic serve -p 8080 --no-livereload**
