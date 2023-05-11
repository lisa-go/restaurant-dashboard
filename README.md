<h1 align="center"> restaurant-dashboard
<img src="https://i.imgur.com/Dg1qjM9.png" alt="takeout emoji" width="40" /> </h1>

#### Click [here](https://lisa-go.github.io/restaurant-dashboard/) for live preview.

! Disclaimer: page might take some time to load at first since I am using a free
tier server. <br><br>

# Made with

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<br><br>

# Description

#### Restaurant Dashboard is a web application designed to assist restaurant owners and managers in managing their restaurant's day-to-day operations. The application provides a user-friendly interface that enables users to manage orders, menus, and also look at the statistics.

<br><br>

# Features

- Light and Dark Mode toggle: The application offers a toggle that enables users
  to switch between light and dark mode with ease, improving the overall user
  experience.

- Responsive Design: The application boasts a responsive design that
  automatically adjusts to the user's screen size, ensuring that the design is
  displayed as intended. When the window is in portrait mode, the sidebar is
  split into a top and bottom bar, providing a seamless user experience. This is
  also the default mobile view.

- Statistics: The Overview page provides users with a quick glance at key
  statistics that are generated from data collected from all transactions.
  Additionally, users can access the Statistics page to view comprehensive
  graphs that provide detailed insights.

- Order Management: The application enables users to manage orders from
  customers. Users can access a list of all orders, categorized by today's
  orders and past orders. To ensure that users do not have to endlessly scroll
  through orders, there is a limit of 50 transactions per page. Users can hover
  over an order to view the items in the order.

- Menu Management: The application allows users to view current menu items,
  along with their ratings and descriptions. This feature provides users with
  the ability to manage menu items effectively.

<br><br>

# Previews

### Overview Page

<img src="https://i.imgur.com/wffHaGs.png" alt="overview page" width="700" />

### Orders Page

<img src="https://i.imgur.com/k6AYSI5.png" alt="orders page" width="700" />

### Page Navigation for Orders

<img src="https://i.imgur.com/HilwNJa.png" alt="page navigation" width="155" />

### Statistics Page

<img src="https://i.imgur.com/KHihIAa.png" alt="statistics page" width="700" />

### Graph Navigation for Statistics

<img src="https://i.imgur.com/npD21vM.png" alt="graph navigation" width="200" />

### Night Mode Graph

<img src="https://i.imgur.com/WIaeM9p.png" alt="night mode graph" width="700" />

### Night Mode Menu

<img src="https://i.imgur.com/ygWDFup.png" alt="night mode menu" width="700" />

### Portrait Night Mode

<img src="https://i.imgur.com/0NAo124.png" alt="night mode menu" width="400" />

### Initial Figma Sketch

<img src="https://i.imgur.com/uZP5pDQ.png" alt="figma" width="700" />
<br><br>

# Things I learned from this Project

- Utilizing Figma to draft a project beforehand can be a helpful way to get
  started when a layout is already in mind.

- Media queries for portrait mode can be interesting and can be easily
  incorporated into projects using Sass.

```sass
@media only screen and (orientation: portrait) {
  #page-container {
    flex-direction: column-reverse;
  }
}
```

- Redux and Redux Toolkit can be effective for state management and API calls,
  eliminating the need to prop-drill through multiple layers of components.

- Light and dark modes can be implemented by storing the view mode in a state
  and adjusting the container ID accordingly when the switch is clicked.

```ts
export default function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <div
      className='App'
      id={viewMode}>
      <div id='page-container'>
        <NavBar />
        <Content />
        <PortraitHeader />
      </div>
    </div>
  );
}
```

- Styling of cards can be alternated in multiples using CSS/Sass.

```sass
#light #menu-container .content-container .card-container {
  .card {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .card:nth-of-type(4n + 0) {
    border-color: $lt-blue;
  }
  .card:nth-of-type(4n + 1) {
    border-color: $lt-green;
  }
  .card:nth-of-type(4n + 2) {
    border-color: $lt-pink;
  }
  .card:nth-of-type(4n + 3) {
    border-color: $lt-purple;
  }
}
```

- Pages can be implemented for orders to improve user experience, and the
  current page can be tracked and mapped out based on transactions.

Keep track of the current page

```ts
const pageNumber = useSelector((state: RootState) => state.pageNumber.current);
let pageMax = pageNumber * 50;
let pageMin = pageMax - 50;
```

Map out transactions based on page number

```ts
data
  .reverse()
  .slice(pageMin, pageMax)
  .map((card) => {
    return (
      <Card
        key={card._id}
        card={card}
      />
    );
  });
```

- It was also my first time implementing graphs in my project. I use the
  recharts library for this.

```
npm install recharts
```

- How to switch the current view using refs and select / options for the
  statistics page to navigate between the different graphs

```ts
const IOFref = useRef<null | HTMLDivElement>(null);
const OPDWref = useRef<null | HTMLDivElement>(null);
const OPHref = useRef<null | HTMLDivElement>(null);

const graphs = [
  { ref: IOFref, name: 'Item Order Frequency' },
  { ref: OPDWref, name: 'Orders Per Day in a Week' },
  { ref: OPHref, name: 'Orders & Items Ordered Per Hour' },
];
const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const r = graphs[+e.target.value].ref;
  r.current?.scrollIntoView({ behavior: 'smooth' });
};
```

```ts
<select
  name='graph-select'
  id='graph-select'
  onChange={(e) => onSelect(e)}>
  {graphs.map((graph, index) => {
    return (
      <option
        value={index}
        key={index}>
        {graph.name}
      </option>
    );
  })}
</select>
```

- Custom scrollbars can be implemented using CSS/SCSS.

```scss
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: $brown;
  border-radius: 10px;
}

#light ::-webkit-scrollbar-thumb:hover {
  background: $off-black;
}

#dark ::-webkit-scrollbar-thumb:hover {
  background: $off-white;
}
```
