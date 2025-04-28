# dica
Teste de perfil DICA


Instruções para Deployment:

Processo de Build:
```shell
# Clonar repositório (após você criar)
git clone [seu-repositorio]
cd dica

# Construir imagem Docker
docker build -t eduhass/dica:1.0.0 .

# Publicar no seu registry
docker push eduhass/dica:1.0.0
```

Deployment no Kubernetes:

```bash
# Editar os manifestos para apontar para seu registry
# Substitua ${YOUR_REGISTRY} pelo endereço do seu registry

# Aplicar manifestos
kubectl apply -f kubernetes/
```

Configuração do Ingress:
- O manifesto de Ingress já está configurado para trabalhar com o NGINX Ingress Controller e o cert-manager
- Substitua dica.comphass.com pelo seu domínio real
- O TLS será gerenciado automaticamente pelo cert-manager



Observações para o Ambiente de Produção:

1. Implementei um HorizontalPodAutoscaler para escalar automaticamente a aplicação conforme a demanda
2. As probes de liveness e readiness garantem alta disponibilidade
3. Limitei os recursos de CPU e memória para evitar consumo excessivo

Se precisar de ajustes para requisitos específicos do seu cluster Kubernetes ou de melhorias na aplicação, basta me avisar que posso ajustar conforme necessário.


### Teste local
```shell
docker container rm -f dica
docker build -t dica:1.0.0 .
docker run -d -p 8080:80 --name dica eduhass/dica:1.0.0
```