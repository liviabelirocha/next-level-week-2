import React, { useState } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import api from "../../services/api";

import styles from "./styles";

function TeacherList() {
  const [areFiltersVisible, setFiltersVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setFiltersVisible(false);
    setTeachers(response.data);
  }

  function handleToggleFiltersVisible() {
    setFiltersVisible(!areFiltersVisible);
  }

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis."
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {areFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              onChangeText={(text) => setSubject(text)}
              value={subject}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  onChangeText={(text) => setWeekDay(text)}
                  value={week_day}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  onChangeText={(text) => setTime(text)}
                  value={time}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o horário?"
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
