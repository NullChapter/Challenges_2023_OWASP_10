/**
 * @author Davis Jeffrey
 */
package com.pop;

import net.jcip.annotations.Immutable;

@Immutable
public class Question {
    private String question;
    private String option;
    private Object feedback;

    public Question() {

    }

    public Question(String question, String option, Object feedback) {
        this.question = question;
        this.option = option;
        this.feedback = feedback;
    }

    @Override
    public String toString() {
        return "Question: " + question + ", option: " + option + ", feedback: " + "******";
    }

    public Object getFeedback() {
        return feedback;
    }

    public String getOption() {
        return option;
    }

    public String getQuestion() {
        return question;
    }

    public void setFeedback(Object feedback) {
        this.feedback = feedback;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
