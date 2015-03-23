-- Unless otherwise noted, the source of edits is this list from GameFAQs
-- http://www.gamefaqs.com/boards/217-pokemon/69236080?page=0#1

-- Movie 1
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP065';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK01';
INSERT INTO episodes VALUES ('??100', NULL, NULL, 'The Birth of Mewtwo', '1999-04-08', (@mark := @mark + 1))
  ON DUPLICATE KEY UPDATE series = NULL, number = NULL, title = 'The Birth of Mewtwo', airdate = '1999-04-08', chronology = @mark;
INSERT INTO dubs VALUES ('??100', NULL, NULL, 'The Uncut Story of Mewtwo\'s Origin', '2000-03-21')
  ON DUPLICATE KEY UPDATE season = NULL, number = NULL, title = 'The Uncut Story of Mewtwo\'s Origin', airdate = '2000-03-21';;
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M01';

-- Winter Holiday JPN-1998
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP071';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK02';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK03';

-- Winter Holiday JPN-1999
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP126';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK05';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK06';

-- Movie 2 Extra: Slowking's Day
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP128';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE title = 'Yadoking\'s Day';

-- Movie 3
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP155';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK07';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M03';

-- Winter Holiday JPN-2000 & Mewtwo Returns
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP178';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK08';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK09';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE title = 'We Are the Pichu Brothers - Balloon Disturbance';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'TV001';

-- Movie 4
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP205';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK10';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M04';

-- Winter Holiday JPN-2001; Legend of Thunder
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP230';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'TV002';

-- Movie 5
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP256';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK11';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M05';

-- Chronicles
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG002';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS001';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG003';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS002';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG004';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS003';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG007';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS004';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG013';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS005';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG014';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS006';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS007';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG019';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS008';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG029';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS009';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS010';

-- Movie 6
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG035';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK12';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M06';

-- Chronicles
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG040';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS011';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG045';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS012';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS013';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG046';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS014';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG067';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS015';

-- Movie 7
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG085';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M07';

-- Summer Holiday JPN-2004
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG087';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK13';

-- Chronicles
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG093';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS016';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG094';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS017';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG095';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS018';

-- Pikachu 3D
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG117';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK14';

-- Movie 8
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG134';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M08';

-- Summer Holiday JPN-2005
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG136';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK15';

-- Special JPN-2007
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG145';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS019';

-- The Mastermind of Mirage Pokémon
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG150';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'TV003';

-- Pikachu 3D 2
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG179';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK16';

-- Movie 9
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG183';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M09';

-- Summer Holiday JPN-2006
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG185';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK17';

-- Movie 10
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP039';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M10';

-- Summer Holiday JPN-2007
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP041';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK18';

-- TODO: Check this, air dates of these specials are two years apart :/
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP074';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS020';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS021';

-- Movie 11
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP086';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M11';

-- Summer Holiday JPN-2008
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP087';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK19';

-- Movie 12
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP135';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M12';

-- Summer Holiday JPN-2009
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP136';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK20';

-- Spring Special JPN-2010
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP166';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS022';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS023';

-- Movie 13
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP178';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M13';

-- Summer Holiday JPN-2010
SELECT chronology INTO @mark FROM episodes WHERE code = 'DP181';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK21';

-- Spring Special JPN-2011
SELECT chronology INTO @mark FROM episodes WHERE code = 'BW018';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS024';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS025';

-- Movie 14
SELECT chronology INTO @mark FROM episodes WHERE code = 'BW037';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK22';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M14';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M14b';

-- Summer Holiday JPN-2012
SELECT chronology INTO @mark FROM episodes WHERE code = 'BW086';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK23';
--
SELECT chronology INTO @mark FROM episodes WHERE code = 'BW087';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK24';

-- Movie 15
SELECT chronology INTO @mark FROM episodes WHERE code = 'BW097';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M15';

-- Movie 16
SELECT chronology INTO @mark FROM episodes WHERE code = 'BW133';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK25';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS026';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M16';

-- Fall Special JPN-2013
SELECT chronology INTO @mark FROM episodes WHERE code = 'BW142';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS027';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'TV004';

-- Spring Special JPN-2014
SELECT chronology INTO @mark FROM episodes WHERE code = 'XY021';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS028';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'SS029';


-- Electric Soldier Porygon Fallout
-- http://www.gamefaqs.com/boards/217-pokemon/69236080?page=1#15
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP045';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'EP047'; -- A Chansey Operation
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'EP052'; -- Princess vs. Princess

-- Movie 2
-- http://www.gamefaqs.com/boards/217-pokemon/69236080?page=3#32
SELECT chronology INTO @mark FROM episodes WHERE code = 'EP105';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'PK04';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE code = 'M02';

-- Pichu Specials
-- http://www.gamefaqs.com/boards/217-pokemon/69236080?page=4#42
SELECT chronology INTO @mark FROM episodes WHERE code = 'AG034';
UPDATE episodes SET chronology = (@mark := @mark + 1) WHERE title = 'Pichu Bros. Wild Adventure';


-- Original Edits from this point onwards

-- MV Sewol Ferry Disaster
SET @mark := 0;
UPDATE dubs d JOIN (
  SELECT code, @mark := @mark + 1 number FROM (
    SELECT * FROM (
      (SELECT code, number FROM dubs WHERE season = 18)
      UNION
      (SELECT 'XY024', 1.5 FROM DUAL)
    ) a GROUP BY code ORDER BY number
  ) b
) t ON d.code = t.code SET d.number = t.number;
