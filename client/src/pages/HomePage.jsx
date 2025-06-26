import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Statistic, Carousel, Divider, List, Tag } from 'antd';
import { BookOutlined, RocketOutlined, TrophyOutlined, TeamOutlined, FireOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Service imports
import { getLessons } from '../services/lessonService';
import { getUserProgress } from '../services/userService';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const StyledHero = styled.div`
  background: linear-gradient(rgba(29, 53, 87, 0.8), rgba(29, 53, 87, 0.8)), 
              url('/assets/images/hero-background.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 80px 0;
  text-align: center;
  border-radius: 0 0 20px 20px;
  margin-bottom: 40px;
`;

const FeatureCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .ant-card-head-title {
    font-size: 18px;
  }
`;

const StyledCarousel = styled(Carousel)`
  margin: 40px 0;
  
  .slick-dots li button {
    background: #457B9D;
  }
  
  .slick-dots li.slick-active button {
    background: #E63946;
  }
`;

const CarouselItem = styled.div`
  height: 300px;
  background: #f0f2f5;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledStatistic = styled(Statistic)`
  .ant-statistic-title {
    font-size: 16px;
  }
  
  .ant-statistic-content {
    font-size: 24px;
    color: #E63946;
  }
`;

const ProgressSection = styled.div`
  background-color: #f0f2f5;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 40px;
`;

const HomePage = () => {
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const lessonsData = await getLessons();
        const progressData = await getUserProgress();
        
        setLessons(lessonsData);
        setUserProgress(progressData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const features = [
    {
      title: 'Học từ vựng',
      icon: <BookOutlined style={{ fontSize: 32, color: '#E63946' }} />,
      description: 'Hệ thống thẻ ghi nhớ thông minh giúp bạn học từ vựng hiệu quả với công nghệ spaced repetition.'
    },
    {
      title: 'Luyện ngữ pháp',
      icon: <RocketOutlined style={{ fontSize: 32, color: '#457B9D' }} />,
      description: 'Bài giảng trực quan và bài tập tương tác giúp bạn nắm vững ngữ pháp tiếng Trung cơ bản.'
    },
    {
      title: 'Đề thi TOCFL A1',
      icon: <TrophyOutlined style={{ fontSize: 32, color: '#1D3557' }} />,
      description: 'Đề thi thử với cấu trúc giống đề thi thật, giúp bạn chuẩn bị tốt nhất cho kỳ thi TOCFL.'
    },
    {
      title: 'Cộng đồng học tập',
      icon: <TeamOutlined style={{ fontSize: 32, color: '#A8DADC' }} />,
      description: 'Tham gia cộng đồng học tập sôi động, chia sẻ kinh nghiệm và học hỏi từ những người khác.'
    }
  ];
  
  const testimonials = [
    {
      content: 'Tôi đã học tiếng Trung được 3 tháng với ứng dụng này và đã vượt qua kỳ thi TOCFL A1 với số điểm cao.',
      author: 'Nguyễn Văn A',
      role: 'Sinh viên'
    },
    {
      content: 'Hệ thống thẻ ghi nhớ thông minh giúp tôi nhớ từ vựng lâu hơn mà không cần phải học thuộc một cách máy móc.',
      author: 'Trần Thị B',
      role: 'Nhân viên văn phòng'
    },
    {
      content: 'Các bài tập tương tác và trò chơi học tập làm cho việc học tiếng Trung trở nên thú vị và không nhàm chán.',
      author: 'Lê Văn C',
      role: 'Doanh nhân'
    }
  ];
  
  return (
    <Content style={{ padding: '0 50px' }}>
      <StyledHero>
        <Title level={1} style={{ color: 'white' }}>Học tiếng Trung TOCFL A1</Title>
        <Paragraph style={{ fontSize: 18, color: 'white', maxWidth: 600, margin: '20px auto' }}>
          Nền tảng học tiếng Trung hiện đại giúp bạn chinh phục kỳ thi TOCFL A1 với phương pháp học tập hiệu quả.
        </Paragraph>
        <Button type="primary" size="large" style={{ marginTop: 20 }}>
          <Link to="/lessons">Bắt đầu học ngay</Link>
        </Button>
      </StyledHero>
      
      {userProgress && (
        <ProgressSection>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>Tiến độ học tập của bạn</Title>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={6}>
              <StyledStatistic 
                title="Từ vựng đã học" 
                value={userProgress.vocabularyLearned} 
                suffix={`/ ${userProgress.totalVocabulary}`} 
                prefix={<FireOutlined />} 
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StyledStatistic 
                title="Bài học đã hoàn thành" 
                value={userProgress.lessonsCompleted} 
                suffix={`/ ${userProgress.totalLessons}`} 
                prefix={<BookOutlined />} 
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StyledStatistic 
                title="Điểm trung bình" 
                value={userProgress.averageScore} 
                suffix="/ 100" 
                prefix={<TrophyOutlined />} 
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <StyledStatistic 
                title="Ngày học liên tiếp" 
                value={userProgress.streak} 
                prefix={<FireOutlined />} 
              />
            </Col>
          </Row>
          
          <Divider />
          
          <Row justify="center" style={{ marginTop: 20 }}>
            <Col>
              <Button type="primary" size="large">
                <Link to="/dashboard">Xem chi tiết tiến độ</Link>
              </Button>
            </Col>
          </Row>
        </ProgressSection>
      )}
      
      <Title level={2} style={{ textAlign: 'center', margin: '40px 0' }}>Tính năng nổi bật</Title>
      <Row gutter={[24, 24]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <FeatureCard
              title={feature.title}
              extra={feature.icon}
            >
              <Paragraph>{feature.description}</Paragraph>
            </FeatureCard>
          </Col>
        ))}
      </Row>
      
      <Title level={2} style={{ textAlign: 'center', margin: '40px 0 20px' }}>Bài học mới nhất</Title>
      <Row gutter={[24, 24]}>
        {lessons.slice(0, 3).map(lesson => (
          <Col xs={24} sm={12} md={8} key={lesson.id}>
            <Card
              hoverable
              cover={<img alt={lesson.titleVi} src={lesson.imageUrl || '/assets/images/lesson-default.jpg'} />}
              actions={[
                <Link to={`/lessons/${lesson.id}`}>Học ngay</Link>
              ]}
            >
              <Card.Meta
                title={`${lesson.titleZh} (${lesson.titleVi})`}
                description={`Bài ${lesson.orderNum}: ${lesson.description?.substring(0, 100)}...`}
              />
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row justify="center" style={{ margin: '20px 0 40px' }}>
        <Col>
          <Button type="primary">
            <Link to="/lessons">Xem tất cả bài học</Link>
          </Button>
        </Col>
      </Row>
      
      <Title level={2} style={{ textAlign: 'center', margin: '40px 0 20px' }}>Người học nói gì về chúng tôi</Title>
      <StyledCarousel autoplay>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <Paragraph style={{ fontSize: 18, fontStyle: 'italic' }}>
              "{testimonial.content}"
            </Paragraph>
            <Title level={4} style={{ marginBottom: 0 }}>{testimonial.author}</Title>
            <Paragraph>{testimonial.role}</Paragraph>
          </CarouselItem>
        ))}
      </StyledCarousel>
      
      <Divider />
      
      <Row justify="center" style={{ margin: '40px 0' }}>
        <Col xs={24} md={16} style={{ textAlign: 'center' }}>
          <Title level={2}>Sẵn sàng bắt đầu hành trình học tiếng Trung?</Title>
          <Paragraph style={{ fontSize: 16, margin: '20px 0' }}>
            Đăng ký ngay hôm nay để trải nghiệm phương pháp học tiếng Trung hiệu quả và thú vị.
          </Paragraph>
          <Button type="primary" size="large">
            <Link to="/register">Đăng ký miễn phí</Link>
          </Button>
        </Col>
      </Row>
    </Content>
  );
};

export default HomePage; 