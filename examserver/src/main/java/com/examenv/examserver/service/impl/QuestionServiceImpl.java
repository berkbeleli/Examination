package com.examenv.examserver.service.impl;

import com.examenv.examserver.model.exam.Question;
import com.examenv.examserver.model.exam.Quiz;
import com.examenv.examserver.repo.QuestionRepository;
import com.examenv.examserver.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;

public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Set<Question> getQuestion() {
        return new HashSet<>(this.questionRepository.findAll());
    }

    @Override
    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).get();
    }

    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }
}