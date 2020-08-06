import React from "react";

import zapIcon from "../../assets/images/icons/whatsapp.svg";

import api from "../../services/api";

import "./styles.css";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  function createNewConnection() {
    api.post("connections", {
      user_id: props.teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={props.teacher.avatar} alt={props.teacher.name} />
        <div>
          <strong>{props.teacher.name}</strong>
          <span>{props.teacher.subject}</span>
        </div>
      </header>

      <p>{props.teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {props.teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/${props.teacher.whatsapp}`}
        >
          <img src={zapIcon} alt="Whatsapp" />
          Entrar em Contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
