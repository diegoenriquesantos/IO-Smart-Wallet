ionic start zerium-test blank
git clone git@gitlab.com:diego.enrique.santos/zrm-io-smartwallet.git
sudo rm -R zerium-test/resources/
sudo rm -R zerium-test/src/
 
sudo rm /home/ubuntu/workspace/zerium-test/package.json
sudo rm /home/ubuntu/workspace/zerium-test/.editorconfig
sudo rm /home/ubuntu/workspace/zerium-test/.gitignore
sudo rm /home/ubuntu/workspace/zerium-test/config.xml

cd zrm-io-smartwallet/
sudo mv resources ../zerium-test/
sudo mv src ../zerium-test/
sudo mv www ../zerium-test/
sudo mv package.json ../zerium-test/
sudo mv .editorconfig ../zerium-test/
sudo mv .gitignore ../zerium-test/
sudo mv config.xml ../zerium-test/

sudo mv README.md ../zerium-test/
sudo mv install.sh ../zerium-test/

cd ..
sudo rm -R zrm-io-smartwallet/
sudo mv zerium-test zrm-io-smartwallet
cd zrm-io-smartwallet/
ionic serve -p 8080 --no-livereload