import React from "react";
import { Image } from "antd";

type PartsData = {
  [key: string]: {
    title: string;
    jsx: JSX.Element;
  };
};
const partsData: PartsData = {
  "Назначение и описание": {
    title: "Назначение и описани",
    jsx: (
      <>
        Форма корпуса определяется в основном технологическими,
        эксплуатационными и эстетическими условиями с учетом его прочности и
        жесткости, а конструктивное оформление всецело зависит от типа
        редуктора. На экране представлен двухступенчатый цилиндрический зубчатый
        редуктор с наружными конструктивными элементами. Тип корпуса: сложный
        закрытый маслонаполненный металлический. Ведущий вал расположен сверху,
        а ведомый - снизу. Взаимное расположение осей входного и выходного валов
        - параллельное. Используемые подшипники: шариковые радиальные
        однорядные. Расположение зубчатых колес несимметричное.
      </>
    ),
  },
  362: {
    title: "Верхняя часть корпуса",
    jsx: (
      <>
        Форма корпуса определяется в основном технологическими,
        эксплуатационными и эстетическими условиями с учетом его прочности и
        жесткости, а конструктивное оформление всецело зависит от типа
        редуктора. На экране представлен двухступенчатый цилиндрический зубчатый
        редуктор с наружными конструктивными элементами. Тип корпуса: сложный
        закрытый маслонаполненный металлический. Ведущий вал расположен сверху,
        а ведомый - снизу. Взаимное расположение осей входного и выходного валов
        - параллельное. Используемые подшипники: шариковые радиальные
        однорядные. Расположение зубчатых колес несимметричное.
      </>
    ),
  },
  "Нижняя часть корпуса": {
    title: "Нижняя часть корпуса",
    jsx: (
      <>
        Форма корпуса определяется в основном технологическими,
        эксплуатационными и эстетическими условиями с учетом его прочности и
        жесткости, а конструктивное оформление всецело зависит от типа
        редуктора. На экране представлен двухступенчатый цилиндрический зубчатый
        редуктор с наружными конструктивными элементами. Тип корпуса: сложный
        закрытый маслонаполненный металлический. Ведущий вал расположен сверху,
        а ведомый - снизу. Взаимное расположение осей входного и выходного валов
        - параллельное. Используемые подшипники: шариковые радиальные
        однорядные. Расположение зубчатых колес несимметричное.
      </>
    ),
  },
  "Средняя часть корпуса": {
    title: "Средняя часть корпуса",
    jsx: (
      <>
        Форма корпуса определяется в основном технологическими,
        эксплуатационными и эстетическими условиями с учетом его прочности и
        жесткости, а конструктивное оформление всецело зависит от типа
        редуктора. На экране представлен двухступенчатый цилиндрический зубчатый
        редуктор с наружными конструктивными элементами. Тип корпуса: сложный
        закрытый маслонаполненный металлический. Ведущий вал расположен сверху,
        а ведомый - снизу. Взаимное расположение осей входного и выходного валов
        - параллельное. Используемые подшипники: шариковые радиальные
        однорядные. Расположение зубчатых колес несимметричное.
      </>
    ),
  },
  "Ведущий вал": {
    title: "Ведущий вал",
    jsx: (
      <>
        {/* ВАЛЫ КРУТЫЕ <hr />
        <img
          src="https://static.probusiness.io/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg"
          width={200}
          alt=""
        /> */}
        Обычно ведущий вал редуктора быстроходный. Он жестко соединен с
        двигателем и вращается с такой же скоростью, до 1500 об/мин. При
        обратном отношении, когда ведущим является колесо и скорость вращения на
        выходе возрастает, а крутящий момент падает, узел называют понижающим.
      </>
    ),
  },
  "Промежуточный вал": {
    title: "Промежуточный вал",
    jsx: (
      <>
        Промежуточный вал - деталь, являющаяся посредником при передаче момента
        вращения при помощи шестерёнок с одного вала на другой.
      </>
    ),
  },
  "Ведомый вал": {
    title: "Ведомый вал",
    jsx: (
      <>
        Ведомый вал вращается в противоположном направлении по отношению к
        ведущему валу.
      </>
    ),
  },
  "Крышка промежуточная верхняя": {
    title: "Крышка промежуточная верхняя",
    jsx: (
      <>
        Ведомый вал вращается в противоположном направлении по отношению к
        ведущему валу.
      </>
    ),
  },
  "Зубчатое колесо": {
    title: "Зубчатое колесо",
    jsx: (
      <>
        Основная деталь зубчатой передачи в виде диска с зубьями на
        цилиндрической или конической поверхности, входящими в зацепление с
        зубьями другого зубчатого колеса.
      </>
    ),
  },
  "Зубчатое колесо.002": {
    title: "Зубчатое колесо.002",
    jsx: (
      <>
        Основная деталь зубчатой передачи в виде диска с зубьями на
        цилиндрической или конической поверхности, входящими в зацепление с
        зубьями другого зубчатого колеса.
      </>
    ),
  },
  "Колесо для подачи масла": {
    title: "Колесо для подачи масла",
    jsx: (
      <>
        Основная деталь зубчатой передачи в виде диска с зубьями на
        цилиндрической или конической поверхности, входящими в зацепление с
        зубьями другого зубчатого колеса.
      </>
    ),
  },
  "": {
    title: "Колесо для подачи масла",
    jsx: (
      <>
        Основная деталь зубчатой передачи в виде диска с зубьями на
        цилиндрической или конической поверхности, входящими в зацепление с
        зубьями другого зубчатого колеса.
      </>
    ),
  },
  "Крышка ведомого вала": {
    title: "Крышка ведомого вала",
    jsx: (
      <>
        Мазеудерживающие кольца применяют при густой смазке подшипников качения.
        Их устанавливают так, чтобы они несколько выступали за торец корпуса
        редуктора или стакана. При вращении мазеудерживающего кольца жидкое
        масло сбрасывается центробежной силой, что предотвращает вымывание
        густой смазки.
      </>
    ),
  },
  "Крышка промежуточного вала.002": {
    title: "Крышка промежуточного вала.002",
    jsx: (
      <>
        Мазеудерживающие кольца применяют при густой смазке подшипников качения.
        Их устанавливают так, чтобы они несколько выступали за торец корпуса
        редуктора или стакана. При вращении мазеудерживающего кольца жидкое
        масло сбрасывается центробежной силой, что предотвращает вымывание
        густой смазки.
      </>
    ),
  },
  "Крышка промежуточная средняя": {
    title: "Крышка промежуточная средняя",
    jsx: <>text</>,
  },
  "Крышка промежуточная средняя.002": {
    title: "Крышка промежуточная средняя.002",
    jsx: <>text</>,
  },
  "Крышка промежуточная нижняя": {
    title: "Крышка промежуточная нижняя",
    jsx: <>text</>,
  },
  "Крышка промежуточная нижняя.002": {
    title: "Крышка промежуточная нижняя.002",
    jsx: <>text</>,
  },
};

export default partsData;
