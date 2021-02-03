# io-pay-portal

- [io-pay-portal](#io-pay-portal)
  - [Infrastructure](#infrastructure)
    - [Public endpoint](#public-endpoint)
  - [Code coverage and CI/CD status](#code-coverage-and-cicd-status)
  - [Sequence diagram : _Portale Pagamenti_](#sequence-diagram--portale-pagamenti)

## Infrastructure
The infrastructure decided for the `io-pay-portal` project has been defined with this [PR](https://github.com/pagopa/io-infrastructure-live-new/pull/363)

How it's integrated into the [IO](https://io.italia.it/) system see [here](https://excalidraw.com/#room=82cbf71c24b07f891902,Dl6JQ8FcjKLoDzOZ5Iz8Ew)

All documentary resources can be found here 🚀
- [Portale Pagamenti](https://drive.google.com/drive/u/0/folders/1ZFWGxbC1mAXzbPCT0y6wjv-YFKsNzALO)
### Public endpoint

- [io-pay-portal (fe)](https://io-p-cdnendpoint-iopayportal.azureedge.net/)
- io-pay-portal (be)
  - [verify](https://api.io.italia.it/api/payportal/v1/payment-requests/{rptID})
  - [activate](https://api.io.italia.it/api/payportal/v1/payment-activations)
  - [getPayment](https://api.io.italia.it/api/payportal/v1/{codiceContestoPagamento})


## Code coverage and CI/CD status
[![codecov](https://codecov.io/gh/pagopa/io-pay-portal/branch/main/graph/badge.svg)](https://codecov.io/gh/pagopa/io-pay-portal)

| code review | io-pay-portal | fe-deploy | be-deploy |
| :-------------: |:-------------:|:-------------:|:-------------:|
[![Build Status](https://dev.azure.com/pagopa-io/io-pay-portal/_apis/build/status/pagopa.io-pay-portal.fe.code-review?branchName=refs%2Fpull%2F5%2Fmerge)](https://dev.azure.com/pagopa-io/io-pay-portal/_build/latest?definitionId=69&branchName=refs%2Fpull%2F5%2Fmerge)|[![Build Status](https://dev.azure.com/pagopa-io/io-pay-portal/_apis/build/status/pagopa.io-pay-portal?branchName=refs%2Fpull%2F5%2Fmerge)](https://dev.azure.com/pagopa-io/io-pay-portal/_build/latest?definitionId=65&branchName=refs%2Fpull%2F5%2Fmerge)|[![Build Status](https://dev.azure.com/pagopa-io/io-pay-portal/_apis/build/status/pagopa.io-pay-portal.fe.deploy?repoName=pagopa%2Fio-pay-portal&branchName=175844896-ui-pay-validation)](https://dev.azure.com/pagopa-io/io-pay-portal/_build/latest?definitionId=72&repoName=pagopa%2Fio-pay-portal&branchName=175844896-ui-pay-validation) | [![Build Status](https://dev.azure.com/pagopa-io/io-pay-portal/_apis/build/status/pagopa.io-pay-portal.be.deploy?repoName=pagopa%2Fio-pay-portal&branchName=175844896-be-fn-verify)](https://dev.azure.com/pagopa-io/io-pay-portal/_build/latest?definitionId=67&repoName=pagopa%2Fio-pay-portal&branchName=175844896-be-fn-verify) |

<!-- 

plantuml -tsvg README.md 

-->

## Sequence diagram : _Portale Pagamenti_
> **NOTE** _Portale Pagamenti_ and `io-pay-portal` are different names for the same thing) 
<!-- 
@startuml docs/media/seqdiag-portalepagamenti

autonumber 
participant portale  as "PortalePagamenti"
participant be as "backend"
participant proxy as "pagopa-proxy"
participant pagopa
participant pm as "PM"
participant wl as "WL"

portale -> be : send data RPT

note over be:  Retrieve information about a payment

be -> proxy : **GET** /payment-requests/{rptId}

proxy -> pagopa : nodoVerificaRPT (8001234567890123,Importo)
pagopa -> proxy : resp OK (importo update)

proxy -[#blue]-> be : resp OK {importoSingoloVersamento, CCP}

note over be:  Require a lock (activation) for a payment

be -> proxy : **POST** /payment-activations {rptId, importoSingoloVersamento, CCP}

proxy -> pagopa : nodoAttivaRPT (8001234567890123,Importo)
pagopa -> proxy : resp OK (importo update)


proxy -[#blue]-> be : resp OK (importoSingoloVersamento, Iban, causale, ente)

loop polling requests
note over proxy:  Get the activation status and the paymentId

be -> proxy : **GET** /payment-activations/{CCP}

pagopa -> proxy : cdInfoPayment(idDomain,IUV,CCP,idPayment)

proxy -> pagopa : resp OK

proxy -[#blue]-> be : resp OK (idPagamento)
end

note over be, proxy #FFAAAA: Redirect on WL with paymentId

portale -> wl : send data payment

@enduml 
-->
![](docs/media/seqdiag-portalepagamenti.svg)
