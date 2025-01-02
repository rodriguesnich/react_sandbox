import { useReducer } from "react";

type CardData = {
  id: number;
  text: string;
  isEditing: boolean;
};

const data: CardData[] = [
  {
    id: 0,
    text: "hi",
    isEditing: false,
  },
  {
    id: 1,
    text: "hello",
    isEditing: false,
  },
  {
    id: 2,
    text: "ohaioh",
    isEditing: false,
  },
];

interface cardReducerAction {
  type: 'edit' | 'delete'
  card: CardData
}

function cardReducer(cards: CardData[], action: cardReducerAction) {
  switch (action.type) {
    case 'edit': {
      return cards.map((currCard) => {
        if (action.card.id === currCard.id) {
          return action.card;
        } else {
          return currCard;
        }
      })
    }
    case 'delete': {
      return cards.filter((stateCard) => stateCard.id !== action.card.id)
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function App() {
  const [cards, dispatch] = useReducer(cardReducer, data);

  function handleChangeCard(evtCard: CardData) {
    dispatch({
      type: "edit",
      card: evtCard
    })
  }

  function handleDeleteCard(cardId: number) {
    dispatch({
      type: "delete",
      card: { id: cardId } as CardData
    })
  }

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {cards.map((val) => (
        <Card
          key={val.text}
          data={val}
          handleUpdate={handleChangeCard}
          handleDelete={handleDeleteCard}
        />
      ))}
    </div>
  );
}

function Card({
  data,
  handleUpdate,
  handleDelete,
}: {
  data: CardData;
  handleUpdate: (card: CardData) => void;
  handleDelete: (id: number) => void;
}) {
  function handleToggleEdit() {
    handleUpdate({ ...data, isEditing: !data.isEditing });
  }

  function handleChangeTitle(newText: string) {
    handleUpdate({ ...data, text: newText });
  }

  return (
    <div style={{ border: "1px solid red", width: "15rem", height: "5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >
        <CardTitle text={data.text} isEditing={data.isEditing} handleChangeTitle={handleChangeTitle} />
        <div>
          <button onClick={handleToggleEdit}>e</button>
          <button onClick={() => handleDelete(data.id)}>d</button>
        </div>
      </div>
    </div>
  );
}

function CardTitle({ text, isEditing, handleChangeTitle }: { text: string; isEditing: boolean; handleChangeTitle: (s: string) => void; }) {
  return (
    <>
      {isEditing ? <input type="text" value={text} onChange={e => handleChangeTitle(e.target.value)} /> : <h2>{text}</h2>}
    </>
  );
}

export default App;