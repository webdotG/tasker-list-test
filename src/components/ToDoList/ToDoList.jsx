import React, {useState} from "react";

//получаю todo и settodo переданные из app.js 
function ToDoList ({todo, setTodo}) {

//флаг для обозначения в каком состоянии мы сейчас находимся просмтора или редактирования задачи
  //false - просмотр задачи true - редактирование задачи
  //ксли здесь значение edit совпадает c id который получен после map то выводится div input условие прописано ниже
const[edit,setEdit] = useState(null)

//для установки значения в input value нынешего значения закидываю в него нынешний title
const[value,setValue] = useState('')

  //функция для удаления todo
    //создаю переменную в которую положу новый массив в котором не будет выбранного нами элемента
    //передаю копию массива применяю мктод filter и говорю 
    //что перебераемый id не должен быть равен id полученый от кнопки удаления того обьекта который хочу удалить
    //в функцию setTodo передаю новый массив в котром отсутсвует удалённый обьект
    //тем самым я обновляю значение todo заменяя его на newTodo 
  function deleteTodo(id) {  
      let newTodo = [...todo].filter(item => item.id!== id);
      setTodo(newTodo);
  }

  //функия для изменения статуса задачи-todo
    //мне надо найти id того элемента который я передал через кнопку закрытия-изменения статуса задачи
    //если условие верное и такой id есть то меняю значение status задачи на противоположное
    //если элемент был найден я выхожу из условия и возвращаю весь массив
    //после  изменений обновляю statetodo
  function statusTodo(id) {
      let newTodo = [...todo].filter(item => {
        if (item.id === id) {
          item.status = !item.status;
          console.log('элемент найден задача закрыта/открыта');
        }
        return item;
      })
      setTodo(newTodo);
   }
//функция для редактирования задачи-todo менять значение setedit на true для режима редактирования
  //здесь я беру значение edit и заношу в выше в edit
  //также при нажатии на редактировать закидываю нынещнее значение title 
function editTodo(id, title){
     setEdit(id)
     setValue(title)
  }
  return (
    <div>
    {
      //при помощи MAP вывожу каждый обьект из массива todo в div
      //передаю уникальное значенеие key равное id обьекта 
      //добавляю проверку если edit то выводить input и button сохранить
      //input value при редактировании добавляю текущее значение и добавляю нынешнее значение title
      //если не edit то показывать title
      //добавляю ещё одну проверку для режима редактирования
      //если состояние edit то будет показываться кнопка сохранить
      //если не edit то показываются все остальные кнопки 
      //значение edit лежит здесь которое мы получили при клике на редактировать я заношу в setedit
      //на кнопку вешаю обработчик который будет вызывать функцию удаления аргументом котрой будет id обьекта 
      //добавляю кнопку схоже с удалением задачи но передаю функцию закрытия/открытия задачи

      todo.map( item => (
        <div key={item.id}>
          {  
            edit === item.id 
              ?
              <div>
                <input value={value} />
              </div>
              :
              <div>{item.title}</div>
          }
          {
            edit === item.id 
              ?
              <div>
                <button>сохранить</button>
              </div>
              :
              <div>
                <button onClick={ () =>deleteTodo(item.id)}>Удалить задачу</button>
                <button onClick={ () =>editTodo(item.id, item.title)}>Редактировать задачу</button>
                <button onClick={ () =>statusTodo(item.id)}>открыть/закрыть задачу</button>      
              </div>
          }  
        </div>
      ))
    }
    </div>
  );
}

export default ToDoList;