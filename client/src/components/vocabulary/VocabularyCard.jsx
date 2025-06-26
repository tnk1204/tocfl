import React, { useState } from 'react';
import { Card, Button, Typography, Space, Tooltip, Divider } from 'antd';
import { SoundOutlined, StarOutlined, StarFilled, InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  width: 300px;
  height: 400px;
  margin: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 24px;
  }
`;

const CardFront = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const CardBack = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HanziText = styled(Title)`
  font-size: 48px !important;
  margin-bottom: 16px !important;
  font-family: 'Noto Serif SC', serif;
`;

const PinyinText = styled(Text)`
  font-size: 20px;
  color: #457B9D;
  margin-bottom: 24px;
`;

const MeaningText = styled(Text)`
  font-size: 18px;
  margin-bottom: 16px;
`;

const ExampleText = styled(Text)`
  font-size: 16px;
  margin-top: 16px;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const VocabularyCard = ({ vocabulary, onFavorite, onPlayAudio, onShowDetails }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(vocabulary.isFavorite || false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onFavorite) {
      onFavorite(vocabulary.id, !isFavorite);
    }
  };
  
  const handlePlayAudio = (e) => {
    e.stopPropagation();
    if (onPlayAudio) {
      onPlayAudio(vocabulary.id);
    }
  };
  
  const handleShowDetails = (e) => {
    e.stopPropagation();
    if (onShowDetails) {
      onShowDetails(vocabulary.id);
    }
  };
  
  return (
    <StyledCard 
      onClick={handleFlip}
      actions={[
        <Tooltip title="Phát âm">
          <Button 
            type="text" 
            icon={<SoundOutlined />} 
            onClick={handlePlayAudio}
          />
        </Tooltip>,
        <Tooltip title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}>
          <Button 
            type="text" 
            icon={isFavorite ? <StarFilled style={{ color: '#E63946' }} /> : <StarOutlined />} 
            onClick={handleFavorite}
          />
        </Tooltip>,
        <Tooltip title="Xem chi tiết">
          <Button 
            type="text" 
            icon={<InfoCircleOutlined />} 
            onClick={handleShowDetails}
          />
        </Tooltip>
      ]}
    >
      {!isFlipped ? (
        <CardFront>
          <HanziText level={1}>{vocabulary.hanzi}</HanziText>
          <PinyinText>{vocabulary.pinyin}</PinyinText>
          <Button type="primary" onClick={handleFlip}>Xem nghĩa</Button>
        </CardFront>
      ) : (
        <CardBack>
          <HanziText level={1}>{vocabulary.hanzi}</HanziText>
          <PinyinText>{vocabulary.pinyin}</PinyinText>
          <MeaningText strong>{vocabulary.meaning}</MeaningText>
          
          {vocabulary.example && (
            <>
              <Divider orientation="left">Ví dụ</Divider>
              <ExampleText>{vocabulary.example}</ExampleText>
              <ExampleText type="secondary">{vocabulary.examplePinyin}</ExampleText>
              <ExampleText>{vocabulary.exampleMeaning}</ExampleText>
            </>
          )}
          
          <CardActions>
            <Button onClick={handleFlip}>Quay lại</Button>
          </CardActions>
        </CardBack>
      )}
    </StyledCard>
  );
};

export default VocabularyCard; 