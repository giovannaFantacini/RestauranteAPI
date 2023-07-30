# API Cantina

## Prato do dia

### Um prato do dia é caracterizado por:
### • id (do tipo Schema.Types.ObjectId)
### • nome_prato (do tipo String), o nome do prato
### • dia_prato (do tipo String), o dia a que corresponde o prato

## Ementa da semana

### Uma ementa da semana é caracterizada por:
### • id (do tipo Schema.Types.ObjectId)
### • data (do tipo Date), a data a que corresponde a ementa, com valor default Date.now
### • listaPratos (uma lista de objetos do tipo Prato), a lista de pratos do dia dessa semana

## Reserva

### Uma reserva é caracterizada por:
### • id (do tipo Schema.Types.ObjectId)
### • data (do tipo Date), a data a que corresponde a reserva, com valor default Date.now
### • pratoReservado (do tipo Prato), o prato reservado
### • aluno (um objeto que guarda Num_aluno, Nome_aluno e Email_aluno)
