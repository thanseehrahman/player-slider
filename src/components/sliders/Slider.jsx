import React, { useState } from "react";
import { PlayersData } from "../../context/DataContext";
import { styled } from "styled-components";

function Slider() {
  const { players } = PlayersData();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const length = players.length;
  const player = players[currentIndex];

  const handleHover = () => {
    setActive(true);
    setHover(true);
    setButtonHover(true);
  };

  const setWidth = (index) => {
    let decrease = 25;
    let decreaseWidth = 100 - (index - currentIndex) * decrease;
    return index === currentIndex
      ? 100
      : index > currentIndex
      ? decreaseWidth < 0
        ? 0
        : decreaseWidth
      : 100 + decrease;
  };

  const checkHover = (hover) => {
    return hover ? 1 : 0;
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(players.length - 1);
    }
  };
  const next = () => {
    if (currentIndex < players.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <Container>
      <Left>
        <Slide>
          <PlayerMask onMouseEnter={active ? null : handleHover}>
            <GradientOverlay index={length + 1} />
            {players.map((player, index) => (
              <Player
                key={index}
                index={length - index}
                width={setWidth(index)}
              >
                <Shadow
                  opacity={
                    index > currentIndex ? 0.4 * (index - currentIndex) : 0
                  }
                />
                <Hero src={player.heroURL} />
              </Player>
            ))}
            <Holder src={player.heroURL} />
            <Height index={length + 2}>
              <LeftLine hover={checkHover(hover)} />
              <TopLine hover={checkHover(hover)} />
              <Value hover={checkHover(hover)}>
                {player.height === "" ? "nill" : player.height}
              </Value>
            </Height>
            <Controls index={players.length + 2}>
              <ToggleStats
                onClick={() => setHover(!hover)}
                color={hover ? "#ca3541" : "#01ed70"}
                hover={checkHover(buttonHover)}
              >
                {hover ? "Hide Stats" : "Show Stats"}
              </ToggleStats>
              <Close
                onClick={() => setButtonHover(false)}
                hover={checkHover(active && !hover && buttonHover)}
              >
                <Icon src="/images/icons/close.svg" />
              </Close>
            </Controls>
            <Ring src="/images/objects/ring.svg" index={length + 1} />
          </PlayerMask>
          <Bottom>
            <Prev onClick={prev}>
              <Icon src="/images/icons/left.svg" />
            </Prev>
            <Weight hover={checkHover(hover)}>
              <Value hover={checkHover(hover)}>
                {player.weight === "" ? "nill" : player.weight}
              </Value>
            </Weight>
            <Next onClick={next}>
              <Icon src="/images/icons/right.svg" />
            </Next>
          </Bottom>
        </Slide>
      </Left>
      <Right>
        <PrevCard onClick={prev}>
          <Icon src="/images/icons/left-large.svg" />
        </PrevCard>
        <Card>
          <Top>
            <Head>
              <Title>
                <Name>{player.name}</Name>
                <Tag>
                  <Badge>
                    <TagValue>{player.country}</TagValue>
                    <Flag src={player.flagURL} />
                  </Badge>
                  <Badge>
                    <TagValue>{player.position}</TagValue>
                    <Label />
                  </Badge>
                </Tag>
              </Title>
              <Circle>
                <Number>{player.number}</Number>
              </Circle>
            </Head>
            <StatsGrid>
              <Item>
                <StatsValue>
                  {player.height === "" ? "nill" : player.height}
                </StatsValue>
              </Item>
              <Item>
                <StatsValue>
                  {player.weight === "" ? "nill" : player.weight}
                </StatsValue>
              </Item>
              <Item>
                <StatsValue>
                  {player.skills === "" ? "nill" : player.skills}
                </StatsValue>
              </Item>
            </StatsGrid>
            <Description>{player.description}</Description>
          </Top>
          <ToggleStatsLarge
            onClick={() => setHover(!hover)}
            color={hover ? "#ca3541" : "#01ed70"}
          >
            {hover ? "Hide Stats" : "Show Stats"}
          </ToggleStatsLarge>
        </Card>
        <NextCard onClick={next}>
          <Icon src="/images/icons/right-large.svg" />
        </NextCard>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
`;

const Slide = styled.div`
  height: 100%;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PlayerMask = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const GradientOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background: linear-gradient(180deg, rgba(32, 32, 33, 0) 14.01%, #202020 100%);
  z-index: ${(props) => props.index};
`;

const Player = styled.div`
  height: 100%;
  width: ${(props) => props.width}%;
  position: absolute;
  right: 0;
  transform: translateX(${(props) => (props.width > 100 ? -100 : 0)}%);
  transition: all 0.6s ease-in-out;
  z-index: ${(props) => props.index};
`;

const Shadow = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(32, 32, 32, ${(props) => props.opacity});
  transition: all 0.6s ease-in-out;
`;

const Hero = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
`;

const Holder = styled.img`
  width: 100%;
  visibility: hidden;
`;

const Height = styled.div`
  height: 100%;
  width: 100%;
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => props.index};
`;

const LeftLine = styled.div`
  height: ${(props) => (props.hover === 1 ? 100 : 0)}%;
  width: 6px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #6888ed;
  transition: all 0.3s ease-in-out;
  transition-delay: ${(props) => (props.hover === 1 ? 0 : 0.6)}s;
`;

const TopLine = styled(LeftLine)`
  height: 6px;
  width: ${(props) => (props.hover === 1 ? 100 : 0)}px;
  top: 0;
  transition-delay: 0.3s;

  @media (max-width: 480px) {
    width: ${(props) => (props.hover === 1 ? 70 : 0)}px;
  }
`;

const Value = styled.h5`
  text-transform: uppercase;
  font-size: 32px;
  font-weight: 750;
  opacity: ${(props) => (props.hover === 1 ? 1 : 0)};
  visibility: ${(props) => (props.hover === 1 ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  transition-delay: ${(props) => (props.hover === 1 ? 0.6 : 0)}s;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Controls = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 6px;
  z-index: ${(props) => props.index};
`;

const ToggleStats = styled.button`
  padding: 2px 6px;
  background: ${(props) => props.color};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 750;
  opacity: ${(props) => (props.hover === 1 ? 1 : 0)};
  visibility: ${(props) => (props.hover === 1 ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Close = styled.button`
  height: 22px;
  width: 22px;
  display: grid;
  place-items: center;
  background: #ca3541;
  border-radius: 4px;
  opacity: ${(props) => (props.hover === 1 ? 1 : 0)};
  visibility: ${(props) => (props.hover === 1 ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;

  @media (max-width: 980px) {
    display: none;
  }
`;

const Ring = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  z-index: ${(props) => props.index};
`;

const Bottom = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    height: 40px;
  }
`;

const Prev = styled.button``;

const Icon = styled.img`
  display: inline-block;
`;

const Weight = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #be9b3f;
  border-radius: 6px;
  opacity: ${(props) => (props.hover === 1 ? 1 : 0)};
  visibility: ${(props) => (props.hover === 1 ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.hover === 1 ? 0 : 30)}px);
  transition: all 0.3s ease-in-out;
  transition-delay: ${(props) => (props.hover === 1 ? 0 : 0.6)}s;

  @media (max-width: 480px) {
    width: 60px;
  }
`;

const Next = styled(Prev)``;

const Right = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const PrevCard = styled(Prev)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Card = styled.div`
  height: 750px;
  min-width: 480px;
  width: 100%;
  max-width: 530px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #2b2b2b;
  border: 3px solid #4b4b4b;
  border-radius: 10px;

  @media (max-width: 980px) {
    height: auto;
  }
  @media (max-width: 768px) {
    min-width: 0;
    padding: 28px;
  }
`;
const Top = styled.div``;

const Head = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  @media (max-width: 480px) {
    text-align: center;
  }
`;

const Name = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Tag = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 360px) {
    flex-direction: column;
  }
`;

const Badge = styled.div`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1f253c;
  border-radius: 8px;

  @media (max-width: 480px) {
    padding: 8px 10px;
  }
`;

const TagValue = styled.h5`
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Flag = styled.img`
  height: 20px;
  display: inline-block;
`;

const Label = styled.div`
  height: 20px;
  width: 20px;
  background: #ca3541;
  border-radius: 50%;
`;

const Circle = styled.div`
  height: 86px;
  min-width: 86px;
  display: grid;
  place-items: center;
  background: #1f253c;
  border: 2px solid #323c62;
  border-radius: 50%;

  @media (max-width: 768px) {
    height: 58px;
    min-width: 58px;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const Number = styled.h3`
  font-size: 46px;
  font-weight: 750;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 30px;

  @media (max-width: 980px) {
    display: none;
  }
`;

const Item = styled.div`
  padding: 10px 0;
  background: #242424;
  border-radius: 8px;
`;

const StatsValue = styled.h5`
  text-transform: capitalize;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #848484;
  line-height: 180%;

  @media (max-width: 980px) {
    display: none;
  }
`;

const ToggleStatsLarge = styled(ToggleStats)`
  width: 100%;
  padding: 6px 0;
  border-radius: 6px;
  font-size: 26px;
  opacity: 1;
  visibility: visible;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NextCard = styled(PrevCard)``;

export default Slider;
