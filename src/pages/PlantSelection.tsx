import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { Load } from '../components/Load';
import api from '../services/api';

interface EnviromentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantSelection() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>();
  const [plants, setPlants] = useState<PlantsProps[]>();
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>();
  const [enviromentSelected, setEnviromentSelected] = useState('All');
  const [plantCardSelected, setPlantCardSelected] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setLoading(true);
    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  function handleEnviromentSelected(enviroment: string) {
    setEnviromentSelected(enviroment);
    if (enviroment == 'All') return setFilteredPlants(plants);

    if (plants) {
      const filteredPlants = plants.filter((plant) =>
        plant.environments.includes(enviroment)
      );
      setFilteredPlants(filteredPlants);
    }
  }

  function handlePlantCarSelected(plantCard: string) {
    setPlantCardSelected(plantCard);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;
    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  useEffect(() => {
    async function fechEnviroments() {
      const { data } = await api.get(
        'plants_environments?_sort=title&_order=asc'
      );
      setEnviroments([
        {
          key: 'All',
          title: 'Todos',
        },
        ...data,
      ]);
    }
    fechEnviroments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantCarSelected(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});
