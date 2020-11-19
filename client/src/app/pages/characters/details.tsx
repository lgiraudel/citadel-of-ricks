import { Card, Col, Descriptions, Row, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { findCharacter } from '../../charactersAPI';
import { ExpandedCharacter } from '../../models/character';

export default function details() {
  const [character, setCharacter] = useState<ExpandedCharacter>();
  const { id } = useParams<{ id: string; }>();

  useEffect((): void => {
    (async (): Promise<void> => {
      const character = await findCharacter(id);
      setCharacter(character);
    })();
  }, [id]);

  const combinedFrom = character?.combined.map(realCharacter => (
    <Col key={realCharacter.id}>
      <Card title={realCharacter.name}>
        <Image width={200} src={realCharacter.image} />
        <div>Gender: {realCharacter.gender}</div>
        <div>Species: {realCharacter.species}</div>
        {realCharacter.type ? (<div>Type: {realCharacter.type}</div>) : null}
        <div>Status: {realCharacter.status}</div>
        <div>Location: {realCharacter.location.name}</div>
        <div>Origin: {realCharacter.origin.name}</div>
        <div>Number of episodes: {realCharacter.episode.length}</div>
      </Card>
    </Col>
  ));

  return (
    <>
      <Descriptions title={character?.name} bordered>
        <Descriptions.Item label="Name">{character?.name}</Descriptions.Item>
        <Descriptions.Item label="Gender">{character?.gender}</Descriptions.Item>
        <Descriptions.Item label="Species">{character?.species}</Descriptions.Item>
        <Descriptions.Item label="Type">{character?.type}</Descriptions.Item>
        <Descriptions.Item label="Combined from">
          <Row justify="space-around">
            {combinedFrom}
          </Row>
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}