VPS_USER="root"
VPS_IP="cotaup.com.br"
VPS_PATH="/home/cotaup"

echo "Iniciando deploy automatico"

echo "Limpando builds anteriores"
rm -rf .next
rm -f frontend.zip

echo "Iniciando build"
npm run build

if [ $? -ne 0 ]; then
	echo "Erro no build. Finalizando"
	exit 1
fi

echo "Copiando arquivos estaticos"
mkdir -p .next/standalone/.next/static
mkdir -p .next/standalone/public

cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/

echo "Compactando arquivo frontend"
cd .next/standalone
zip -r -q ../../frontend.zip .
cd ../..

echo "cloud_upload Enviando arquivo para VPS"
scp frontend.zip $VPS_USER@$VPS_IP:$VPS_PATH/frontend/

if [ $? -ne 0 ]; then
	echo "Erro ao enviar arquivo"
	exit 1
fi

echo "Conectando a VPS para atualizar docker"

ssh $VPS_USER@$VPS_IP << EOF
	cd $VPS_PATH/frontend
	
	echo " - Limpando versão antiga"
	find . -maxdepth 1 ! -name 'frontend.zip' ! -name 'Dockerfile' ! -name '.' ! -name '..' -exec rm -rf {} +
	
	echo " - Descompactando nova versão"
	unzip -o -q frontend.zip
	rm frontend.zip

	echo " - Reiniciando docker"
	cd ..
	docker compose up -d --build frontend
	
	docker image prune -f
EOF

echo "Deploy finalizado."
