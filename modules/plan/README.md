# Plan Fact

### to run

```bash
npm install
npm start
open http://localhost:3000
```

### ToDo:
зачение "type" неверно sale_point => sale-point
can we create sale-point-item with zero values while we create new salesplan?
add current period to redux

Просьбы
- при создании документа пожалуйста создайте одну позицию: план по обороту с нулевыми значениями.
    мне для этого нужно создавать либо ненужную кнопку "Добавить" или запрашивать базу перед каждой загрузкой, а есть-ли там план по обороту
- batch CRUD для позиций по товарам batch/execute работает очень медленно
    создание 211 строк занимает более 40 сек
    удаление более 30 сек
- метод для загрузки plan items( 'product' + 'tag' + 'sale-point' )? // nomenclature // all
- period одна цифра (1-февраль) а выводить надо с годом "Февраль 2017" /// unixtime in sec
- несколько одинаковых товрных позиций в документе, можно? // нужно
- пагинация должна быть опциональной