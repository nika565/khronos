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
  project_description TEXT NOT NULL,
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
  task_status ENUM('In Progress', 'Delayed', 'Finished', 'Cancelled') DEFAULT 'In Progress',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (fk_id_users) REFERENCES users (id_user),
  FOREIGN KEY (fk_id_projects) REFERENCES projects (id_project)
);

-- inserts
INSERT INTO users (user_name, user_email, user_password, created_at, updated_at, active, user_role) VALUES 
('Nathan Barros', 'nathan@email.com', '$2a$12$jcucoAjzIj9MUuc/9biFluZnTTalzVcEBUqZfrcvTDvu9w0ZRXSXG', NOW(), NOW(), 'true', 'admin'),
('Monkey D. Luffy', 'monkey@email.com', '$2a$12$jcucoAjzIj9MUuc/9biFluZnTTalzVcEBUqZfrcvTDvu9w0ZRXSXG', NOW(), NOW(), 'true', 'admin');

INSERT INTO projects (name_project, project_description, date_start, date_finish) VALUES
('Projeto 01', 'Uma descrição genérica aqui', '2025-07-01', '2025-08-25' ),
('Projeto 02', 'Uma descrição genérica aqui', '2025-07-01', '2025-07-30'),
('Projeto 03', 'Uma descrição genérica aqui', '2025-09-01', '2025-09-30'),
('Projeto 04', 'Uma descrição genérica aqui', '2025-10-05', '2025-11-25'),
('Projeto 05', 'Uma descrição genérica aqui', '2025-01-30', '2025-03-30');

INSERT INTO tasks (name_task, task_description, date_start, date_finish, fk_id_users, fk_id_projects) VALUES
("Tarefa do Projeto 01", "Descrição genérica 01", "2025-07-02", "2025-07-15", "1", "1"),
("Tarefa do Projeto 02", "Descrição genérica 02", "2025-07-01", "2025-07-07", "1", "2"),
("Tarefa do Projeto 03", "Descrição genérica 03", "2025-09-01", "2025-09-15", "1", "3"),
("Tarefa do Projeto 04", "Descrição genérica 04", "2025-10-05", "2025-07-25", "2", "4"),
("Tarefa do Projeto 05", "Descrição genérica 05", "2025-01-30", "2025-02-15", "2", "5");
