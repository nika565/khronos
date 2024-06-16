-- Script de criação do banco de dados

-- Criação do banco de dados
DROP DATABASE IF EXISTS khronos;
CREATE DATABASE khronos;
USE khronos;

-- Tabela de usuários
CREATE TABLE users (
  id_user INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(125) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  active ENUM('true', 'false') NOT NULL DEFAULT 'true',
  user_role ENUM('admin', 'common') NOT NULL DEFAULT 'common'
);

-- Tabela de projetos
CREATE TABLE projects (
  id_project INT PRIMARY KEY AUTO_INCREMENT,
  name_project VARCHAR(50) NOT NULL,
  date_start DATE NOT NULL,
  date_finish DATE NOT NULL,
  project_status ENUM('Created', 'In Progress', 'Finished', 'Cancelled') DEFAULT 'Created',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de tarefas
CREATE TABLE tasks (
  id_task INT PRIMARY KEY AUTO_INCREMENT,
  name_task VARCHAR(50) NOT NULL,
  task_description TEXT NOT NULL,
  date_start DATE NOT NULL,
  date_finish DATE NOT NULL,
  fk_id_users INT NOT NULL,
  fk_id_projects INT NOT NULL,
  task_status ENUM('In Progress', 'Delayed', 'Finished', 'Cancelled'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (fk_id_users) REFERENCES users (id_user),
  FOREIGN KEY (fk_id_projects) REFERENCES projects (id_project)
);

-- Tabela de squads
CREATE TABLE squads (
  id_squad INT PRIMARY KEY AUTO_INCREMENT,
  name_squad VARCHAR(255) NOT NULL,
  fk_id_projects INT NOT NULL,
  fk_id_users INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (fk_id_projects) REFERENCES projects (id_project),
  FOREIGN KEY (fk_id_users) REFERENCES users (id_user)
);

-- inserts
INSERT INTO users (user_name, user_email, user_password, created_at, updated_at, active, user_role) 
VALUES ('Nathan Barros', 'nathan@email.com', 'nathan123', NOW(), NOW(), 'true', 'admin');
 