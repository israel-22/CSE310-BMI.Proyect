package org.israelsantos.imc_pediatrico.service;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.XYPlot;
import org.jfree.chart.renderer.xy.XYLineAndShapeRenderer;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.springframework.stereotype.Service;

import org.israelsantos.imc_pediatrico.entity.Children;
import org.israelsantos.imc_pediatrico.entity.Control;

import java.awt.Color;
import java.awt.BasicStroke;
import java.io.ByteArrayOutputStream;
import java.util.List;


import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import javax.imageio.ImageIO;
import org.jfree.chart.axis.NumberAxis;


@Service
public class PdfChartService {

    public byte[] generateWeightForAgeChart(
            Children child,
            List<Control> controls) {

        try {

            XYSeries blackUpper = new XYSeries("Black Upper");
            blackUpper.add(0, 4.8);
            blackUpper.add(1, 13.1);
            blackUpper.add(2, 16.7);
            blackUpper.add(3, 20.4);
            blackUpper.add(4, 24.0);
            blackUpper.add(5, 27.8);

            XYSeries redUpper = new XYSeries("Red +2 SD");
            redUpper.add(0, 4.2);
            redUpper.add(1, 11.5);
            redUpper.add(2, 14.8);
            redUpper.add(3, 17.9);
            redUpper.add(4, 21.2);
            redUpper.add(5, 24.2);

            XYSeries green = new XYSeries("Green");
            green.add(0, 3.2);
            green.add(1, 8.9);
            green.add(2, 11.5);
            green.add(3, 13.9);
            green.add(4, 16.1);
            green.add(5, 18.2);

            XYSeries redLower = new XYSeries("Red -2 SD");
            redLower.add(0, 2.4);
            redLower.add(1, 7.0);
            redLower.add(2, 9.0);
            redLower.add(3, 10.8);
            redLower.add(4, 12.3);
            redLower.add(5, 13.7);

            XYSeries blackLower = new XYSeries("Black");
            blackLower.add(0, 2.0);
            blackLower.add(1, 6.3);
            blackLower.add(2, 8.1);
            blackLower.add(3, 9.8);
            blackLower.add(4, 11.1);
            blackLower.add(5, 12.4);

            XYSeriesCollection dataset =
                    new XYSeriesCollection();

            dataset.addSeries(blackUpper);
            dataset.addSeries(redUpper);
            dataset.addSeries(green);
            dataset.addSeries(redLower);
            dataset.addSeries(blackLower);

            XYSeries childSeries =
                    new XYSeries("Calculated Point");

            if (child != null && controls != null) {

                for (Control control : controls) {

                    if (control.getControlDate() == null ||
                            child.getBirthDate() == null ||
                            control.getWeight() == null) {
                        continue;
                    }

                    double ageInYears =
                            (control.getControlDate().toEpochDay()
                                    - child.getBirthDate().toEpochDay())
                                    / 365.25;

                    childSeries.add(
                            ageInYears,
                            control.getWeight()
                    );
                }
            }

            dataset.addSeries(childSeries);

            JFreeChart chart =
                    ChartFactory.createXYLineChart(
                            "Weight/Age - Girls",
                            "Age (years and months)",
                            "Weight (kg)",
                            dataset
                    );

            XYPlot plot = chart.getXYPlot();

            plot.getDomainAxis().setRange(0, 5);
            plot.getRangeAxis().setRange(0, 40);

            XYLineAndShapeRenderer renderer =
                    new XYLineAndShapeRenderer();

            renderer.setSeriesPaint(0, Color.BLACK);
            renderer.setSeriesPaint(1, Color.RED);
            renderer.setSeriesPaint(2, Color.GREEN);
            renderer.setSeriesPaint(3, Color.RED);
            renderer.setSeriesPaint(4, Color.BLACK);

            for (int i = 0; i < 5; i++) {

                renderer.setSeriesLinesVisible(i, true);
                renderer.setSeriesShapesVisible(i, false);
                renderer.setSeriesStroke(
                        i,
                        new BasicStroke(2.0f)
                );
            }

            renderer.setSeriesPaint(5, Color.BLUE);
            renderer.setSeriesLinesVisible(5, false);
            renderer.setSeriesShapesVisible(5, true);
            renderer.setSeriesShape(
                    5,
                    new java.awt.geom.Ellipse2D.Double(
                            -5,
                            -5,
                            10,
                            10
                    )

            );



            plot.setRenderer(renderer);

            chart.setBackgroundPaint(Color.WHITE);

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            ChartUtils.writeChartAsPNG(
                    outputStream,
                    chart,
                    900,
                    500
            );

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Error generating weight-for-age chart",
                    e
            );
        }


    }

    public byte[] generateWeightForAgeBoysChart(
            Children child,
            List<Control> controls) {

        XYSeries blackUpper = new XYSeries("Black Upper");
        XYSeries redUpper = new XYSeries("Red Upper");
        XYSeries green = new XYSeries("Green");
        XYSeries redLower = new XYSeries("Red Lower");
        XYSeries blackLower = new XYSeries("Black Lower");
        XYSeries calculated = new XYSeries("Calculated Point");

        blackUpper.add(0, 5.0);
        blackUpper.add(1, 13.3);
        blackUpper.add(2, 17.1);
        blackUpper.add(3, 20.7);
        blackUpper.add(4, 24.2);
        blackUpper.add(5, 27.9);

        redUpper.add(0, 4.4);
        redUpper.add(1, 12.0);
        redUpper.add(2, 15.3);
        redUpper.add(3, 18.3);
        redUpper.add(4, 21.5);
        redUpper.add(5, 24.2);

        green.add(0, 3.3);
        green.add(1, 9.6);
        green.add(2, 12.2);
        green.add(3, 14.3);
        green.add(4, 16.3);
        green.add(5, 18.3);

        redLower.add(0, 2.5);
        redLower.add(1, 7.7);
        redLower.add(2, 9.7);
        redLower.add(3, 11.3);
        redLower.add(4, 12.7);
        redLower.add(5, 14.1);

        blackLower.add(0, 2.1);
        blackLower.add(1, 6.9);
        blackLower.add(2, 8.6);
        blackLower.add(3, 10.0);
        blackLower.add(4, 11.3);
        blackLower.add(5, 12.4);

        for (Control control : controls) {

            LocalDate birthDate = child.getBirthDate();
            LocalDate controlDate = control.getControlDate();

            double ageInYears =
                    ChronoUnit.DAYS.between(
                            birthDate,
                            controlDate
                    ) / 365.25;

            calculated.add(
                    ageInYears,
                    control.getWeight()
            );
        }

        XYSeriesCollection dataset = new XYSeriesCollection();

        dataset.addSeries(blackUpper);
        dataset.addSeries(redUpper);
        dataset.addSeries(green);
        dataset.addSeries(redLower);
        dataset.addSeries(blackLower);
        dataset.addSeries(calculated);

        JFreeChart chart =
                ChartFactory.createXYLineChart(
                        "Weight/Age - Boys",
                        "Age (years and months)",
                        "Weight (kg)",
                        dataset
                );

        XYPlot plot = chart.getXYPlot();

        XYLineAndShapeRenderer renderer =
                new XYLineAndShapeRenderer();

        renderer.setSeriesPaint(0, Color.BLACK);
        renderer.setSeriesPaint(1, Color.RED);
        renderer.setSeriesPaint(2, Color.GREEN);
        renderer.setSeriesPaint(3, Color.RED);
        renderer.setSeriesPaint(4, Color.BLACK);
        renderer.setSeriesPaint(5, Color.BLUE);

        renderer.setSeriesStroke(
                0,
                new BasicStroke(2.0f)
        );

        renderer.setSeriesStroke(
                1,
                new BasicStroke(2.0f)
        );

        renderer.setSeriesStroke(
                2,
                new BasicStroke(2.0f)
        );

        renderer.setSeriesStroke(
                3,
                new BasicStroke(2.0f)
        );

        renderer.setSeriesStroke(
                4,
                new BasicStroke(2.0f)
        );

        for (int i = 0; i < 5; i++) {
            renderer.setSeriesLinesVisible(i, true);
            renderer.setSeriesShapesVisible(i, false);
        }

        renderer.setSeriesLinesVisible(5, false);
        renderer.setSeriesShapesVisible(5, true);

        renderer.setSeriesShape(
                5,
                new Ellipse2D.Double(
                        -4,
                        -4,
                        8,
                        8
                )
        );

        plot.setRenderer(renderer);

        NumberAxis xAxis =
                (NumberAxis) plot.getDomainAxis();

        xAxis.setRange(0, 5);

        NumberAxis yAxis =
                (NumberAxis) plot.getRangeAxis();

        yAxis.setRange(0, 40);

        BufferedImage image =
                chart.createBufferedImage(
                        900,
                        500
                );

        try (ByteArrayOutputStream output =
                     new ByteArrayOutputStream()) {

            ImageIO.write(
                    image,
                    "png",
                    output
            );

            return output.toByteArray();

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to generate Weight/Age Boys chart",
                    e
            );
        }
    }



    public byte[] generateHeightForAgeChart(
            Children child,
            List<Control> controls) {

        try {

            XYSeries blackUpper = new XYSeries("Black Upper");
            blackUpper.add(0, 55);
            blackUpper.add(1, 82);
            blackUpper.add(2, 96);
            blackUpper.add(3, 106);
            blackUpper.add(4, 116);
            blackUpper.add(5, 124);

            XYSeries redUpper = new XYSeries("Red Upper");
            redUpper.add(0, 53);
            redUpper.add(1, 79.5);
            redUpper.add(2, 93);
            redUpper.add(3, 103);
            redUpper.add(4, 111);
            redUpper.add(5, 119);

            XYSeries green = new XYSeries("Green");
            green.add(0, 49.5);
            green.add(1, 74);
            green.add(2, 86);
            green.add(3, 95);
            green.add(4, 103);
            green.add(5, 109);

            XYSeries redLower = new XYSeries("Red Lower");
            redLower.add(0, 45);
            redLower.add(1, 69);
            redLower.add(2, 80);
            redLower.add(3, 87);
            redLower.add(4, 94);
            redLower.add(5, 100);

            XYSeries blackLower = new XYSeries("Black Lower");
            blackLower.add(0, 43.5);
            blackLower.add(1, 66.5);
            blackLower.add(2, 77);
            blackLower.add(3, 84);
            blackLower.add(4, 90);
            blackLower.add(5, 95);

            XYSeriesCollection dataset =
                    new XYSeriesCollection();

            dataset.addSeries(blackUpper);
            dataset.addSeries(redUpper);
            dataset.addSeries(green);
            dataset.addSeries(redLower);
            dataset.addSeries(blackLower);

            XYSeries childSeries =
                    new XYSeries("Calculated Point");

            if (child != null && controls != null) {

                for (Control control : controls) {

                    if (control.getControlDate() == null ||
                            child.getBirthDate() == null ||
                            control.getHeight() == null) {
                        continue;
                    }

                    double ageInYears =
                            (control.getControlDate().toEpochDay()
                                    - child.getBirthDate().toEpochDay())
                                    / 365.25;

                    childSeries.add(
                            ageInYears,
                            control.getHeight()
                    );
                }
            }

            dataset.addSeries(childSeries);

            JFreeChart chart =
                    ChartFactory.createXYLineChart(
                            "Height/Age - Girls",
                            "Age (years and months)",
                            "Height/Length (m)",
                            dataset
                    );

            XYPlot plot = chart.getXYPlot();

            plot.getDomainAxis().setRange(0, 5);
            plot.getRangeAxis().setRange(40, 125);

            XYLineAndShapeRenderer renderer =
                    new XYLineAndShapeRenderer();

            renderer.setSeriesPaint(0, Color.BLACK);
            renderer.setSeriesPaint(1, Color.RED);
            renderer.setSeriesPaint(2, Color.GREEN);
            renderer.setSeriesPaint(3, Color.RED);
            renderer.setSeriesPaint(4, Color.BLACK);

            for (int i = 0; i < 5; i++) {

                renderer.setSeriesLinesVisible(i, true);
                renderer.setSeriesShapesVisible(i, false);
                renderer.setSeriesStroke(
                        i,
                        new BasicStroke(2.0f)
                );
            }

            renderer.setSeriesPaint(5, Color.BLUE);
            renderer.setSeriesLinesVisible(5, false);
            renderer.setSeriesShapesVisible(5, true);
            renderer.setSeriesShape(
                    5,
                    new java.awt.geom.Ellipse2D.Double(
                            -5,
                            -5,
                            10,
                            10
                    )
            );

            plot.setRenderer(renderer);

            chart.setBackgroundPaint(Color.WHITE);

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            ChartUtils.writeChartAsPNG(
                    outputStream,
                    chart,
                    900,
                    500
            );

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Error generating height-for-age chart",
                    e
            );
        }
    }
    public byte[] generateHeightForAgeBoysChart(
            Children child,
            List<Control> controls) {

        try {

            XYSeries blackUpper =
                    new XYSeries("Black Upper");

            blackUpper.add(0, 55.5);
            blackUpper.add(1, 83);
            blackUpper.add(2, 97);
            blackUpper.add(3, 107);
            blackUpper.add(4, 116);
            blackUpper.add(5, 124);

            XYSeries redUpper =
                    new XYSeries("Red Upper");

            redUpper.add(0, 53.5);
            redUpper.add(1, 80.5);
            redUpper.add(2, 94);
            redUpper.add(3, 103.5);
            redUpper.add(4, 112);
            redUpper.add(5, 119);

            XYSeries green =
                    new XYSeries("Green");

            green.add(0, 50);
            green.add(1, 75.5);
            green.add(2, 86.5);
            green.add(3, 96);
            green.add(4, 103);
            green.add(5, 110);

            XYSeries redLower =
                    new XYSeries("Red Lower");

            redLower.add(0, 46);
            redLower.add(1, 71);
            redLower.add(2, 81);
            redLower.add(3, 89);
            redLower.add(4, 95);
            redLower.add(5, 101);

            XYSeries blackLower =
                    new XYSeries("Black Lower");

            blackLower.add(0, 44);
            blackLower.add(1, 69);
            blackLower.add(2, 78.5);
            blackLower.add(3, 85);
            blackLower.add(4, 91);
            blackLower.add(5, 96);

            XYSeries childSeries =
                    new XYSeries("Calculated Point");

            if (child != null && controls != null) {

                for (Control control : controls) {

                    if (control.getControlDate() == null ||
                            child.getBirthDate() == null ||
                            control.getHeight() == null) {
                        continue;
                    }

                    double ageInYears =
                            (control.getControlDate().toEpochDay()
                                    - child.getBirthDate().toEpochDay())
                                    / 365.25;

                    childSeries.add(
                            ageInYears,
                            control.getHeight()
                    );
                }
            }

            XYSeriesCollection dataset =
                    new XYSeriesCollection();

            dataset.addSeries(blackUpper);
            dataset.addSeries(redUpper);
            dataset.addSeries(green);
            dataset.addSeries(redLower);
            dataset.addSeries(blackLower);
            dataset.addSeries(childSeries);

            JFreeChart chart =
                    ChartFactory.createXYLineChart(
                            "Length/Age - Boys",
                            "Age (years and months)",
                            "Height/Length (cm)",
                            dataset
                    );

            XYPlot plot =
                    chart.getXYPlot();

            plot.getDomainAxis().setRange(0, 5);
            plot.getRangeAxis().setRange(40, 125);

            XYLineAndShapeRenderer renderer =
                    new XYLineAndShapeRenderer();

            renderer.setSeriesPaint(0, Color.BLACK);
            renderer.setSeriesPaint(1, Color.RED);
            renderer.setSeriesPaint(2, Color.GREEN);
            renderer.setSeriesPaint(3, Color.RED);
            renderer.setSeriesPaint(4, Color.BLACK);

            for (int i = 0; i < 5; i++) {

                renderer.setSeriesLinesVisible(i, true);
                renderer.setSeriesShapesVisible(i, false);

                renderer.setSeriesStroke(
                        i,
                        new BasicStroke(2.0f)
                );
            }

            renderer.setSeriesPaint(5, Color.BLUE);
            renderer.setSeriesLinesVisible(5, false);
            renderer.setSeriesShapesVisible(5, true);

            renderer.setSeriesShape(
                    5,
                    new java.awt.geom.Ellipse2D.Double(
                            -5,
                            -5,
                            10,
                            10
                    )
            );

            plot.setRenderer(renderer);

            chart.setBackgroundPaint(Color.WHITE);

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            ChartUtils.writeChartAsPNG(
                    outputStream,
                    chart,
                    900,
                    500
            );

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Error generating height-for-age Boys chart",
                    e
            );
        }
    }



    public byte[] generateBmiForAgeChart(
            Children child,
            List<Control> controls) {

        try {

            XYSeries blackUpper =
                    new XYSeries("Black Upper");

            blackUpper.add(0, 17.7);
            blackUpper.add(1, 21.6);
            blackUpper.add(2, 20.3);
            blackUpper.add(2.0, 20.5);
            blackUpper.add(2.1, 20.5);
            blackUpper.add(3, 20.3);
            blackUpper.add(4, 20.6);
            blackUpper.add(5, 21.1);


            XYSeries redUpper =
                    new XYSeries("Red Upper");

            redUpper.add(0, 16.1);
            redUpper.add(1, 19.6);
            redUpper.add(2, 18.4);
            redUpper.add(2.0, 18.6);
            redUpper.add(2.1, 18.6);
            redUpper.add(3, 18.4);
            redUpper.add(4, 18.5);
            redUpper.add(5, 18.8);


            XYSeries green =
                    new XYSeries("Green");

            green.add(0, 13.3);
            green.add(1, 16.4);
            green.add(2, 15.4);
            green.add(2.0, 15.6);
            green.add(2.1, 15.6);
            green.add(3, 15.4);
            green.add(4, 15.3);
            green.add(5, 15.3);


            XYSeries redLower =
                    new XYSeries("Red Lower");

            redLower.add(0, 11.1);
            redLower.add(1, 13.8);
            redLower.add(2, 13.1);
            redLower.add(2.0, 13.3);
            redLower.add(2.1, 13.3);
            redLower.add(3, 13.1);
            redLower.add(4, 12.8);
            redLower.add(5, 12.7);


            XYSeries blackLower =
                    new XYSeries("Black Lower");

            blackLower.add(0, 10.1);
            blackLower.add(1, 12.7);
            blackLower.add(2, 12.1);
            blackLower.add(2.0, 12.3);
            blackLower.add(2.1, 12.3);
            blackLower.add(3, 12.1);
            blackLower.add(4, 11.8);
            blackLower.add(5, 11.6);


            XYSeriesCollection dataset =
                    new XYSeriesCollection();

            dataset.addSeries(blackUpper);
            dataset.addSeries(redUpper);
            dataset.addSeries(green);
            dataset.addSeries(redLower);
            dataset.addSeries(blackLower);


            XYSeries childSeries =
                    new XYSeries("Calculated Point");

            if (child != null && controls != null) {

                for (Control control : controls) {

                    if (control.getControlDate() == null ||
                            child.getBirthDate() == null ||
                            control.getBmi() == null) {
                        continue;
                    }

                    double ageInYears =
                            (control.getControlDate().toEpochDay()
                                    - child.getBirthDate().toEpochDay())
                                    / 365.25;

                    childSeries.add(
                            ageInYears,
                            control.getBmi()
                    );
                }
            }

            dataset.addSeries(childSeries);


            JFreeChart chart =
                    ChartFactory.createXYLineChart(
                            "BMI/Age - Girls",
                            "Age (years and months)",
                            "BMI",
                            dataset
                    );


            XYPlot plot = chart.getXYPlot();

            plot.getDomainAxis().setRange(0, 5);
            plot.getRangeAxis().setRange(9, 24);


            XYLineAndShapeRenderer renderer =
                    new XYLineAndShapeRenderer();

            renderer.setSeriesPaint(0, Color.BLACK);
            renderer.setSeriesPaint(1, Color.RED);
            renderer.setSeriesPaint(2, Color.GREEN);
            renderer.setSeriesPaint(3, Color.RED);
            renderer.setSeriesPaint(4, Color.BLACK);


            for (int i = 0; i < 5; i++) {

                renderer.setSeriesLinesVisible(i, true);
                renderer.setSeriesShapesVisible(i, false);

                renderer.setSeriesStroke(
                        i,
                        new BasicStroke(2.0f)
                );
            }


            renderer.setSeriesPaint(5, Color.BLUE);
            renderer.setSeriesLinesVisible(5, false);
            renderer.setSeriesShapesVisible(5, true);

            renderer.setSeriesShape(
                    5,
                    new java.awt.geom.Ellipse2D.Double(
                            -5,
                            -5,
                            10,
                            10
                    )
            );


            plot.setRenderer(renderer);

            chart.setBackgroundPaint(Color.WHITE);


            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            ChartUtils.writeChartAsPNG(
                    outputStream,
                    chart,
                    900,
                    500
            );

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Error generating BMI-for-age chart",
                    e
            );
        }
    }

    public byte[] generateBmiForAgeBoysChart(
            Children child,
            List<Control> controls) {

        try {

            XYSeries blackUpper =
                    new XYSeries("Black Upper");

            blackUpper.add(0, 18.1);
            blackUpper.add(1, 21.6);
            blackUpper.add(2, 20.6);
            blackUpper.add(3, 20.0);
            blackUpper.add(4, 19.9);
            blackUpper.add(5, 20.3);


            XYSeries redUpper =
                    new XYSeries("Red Upper");

            redUpper.add(0, 16.3);
            redUpper.add(1, 19.8);
            redUpper.add(2, 18.8);
            redUpper.add(3, 18.4);
            redUpper.add(4, 18.2);
            redUpper.add(5, 18.3);


            XYSeries green =
                    new XYSeries("Green");

            green.add(0, 13.4);
            green.add(1, 16.8);
            green.add(2, 16.0);
            green.add(3, 15.6);
            green.add(4, 15.3);
            green.add(5, 15.2);


            XYSeries redLower =
                    new XYSeries("Red Lower");

            redLower.add(0, 11.1);
            redLower.add(1, 14.4);
            redLower.add(2, 13.8);
            redLower.add(3, 13.4);
            redLower.add(4, 13.1);
            redLower.add(5, 12.9);


            XYSeries blackLower =
                    new XYSeries("Black Lower");

            blackLower.add(0, 10.2);
            blackLower.add(1, 13.4);
            blackLower.add(2, 12.9);
            blackLower.add(3, 12.4);
            blackLower.add(4, 12.1);
            blackLower.add(5, 12.0);


            XYSeries childSeries =
                    new XYSeries("Calculated Point");

            if (child != null && controls != null) {

                for (Control control : controls) {

                    if (control.getControlDate() == null ||
                            child.getBirthDate() == null ||
                            control.getBmi() == null) {
                        continue;
                    }

                    double ageInYears =
                            (control.getControlDate().toEpochDay()
                                    - child.getBirthDate().toEpochDay())
                                    / 365.25;

                    childSeries.add(
                            ageInYears,
                            control.getBmi()
                    );
                }
            }


            XYSeriesCollection dataset =
                    new XYSeriesCollection();

            dataset.addSeries(blackUpper);
            dataset.addSeries(redUpper);
            dataset.addSeries(green);
            dataset.addSeries(redLower);
            dataset.addSeries(blackLower);
            dataset.addSeries(childSeries);


            JFreeChart chart =
                    ChartFactory.createXYLineChart(
                            "BMI/Age - Boys",
                            "Age (years and months)",
                            "BMI",
                            dataset
                    );


            XYPlot plot =
                    chart.getXYPlot();

            plot.getDomainAxis().setRange(0, 5);
            plot.getRangeAxis().setRange(9, 24);


            XYLineAndShapeRenderer renderer =
                    new XYLineAndShapeRenderer();

            renderer.setSeriesPaint(
                    0,
                    Color.BLACK
            );

            renderer.setSeriesPaint(
                    1,
                    Color.RED
            );

            renderer.setSeriesPaint(
                    2,
                    Color.GREEN
            );

            renderer.setSeriesPaint(
                    3,
                    Color.RED
            );

            renderer.setSeriesPaint(
                    4,
                    Color.BLACK
            );


            for (int i = 0; i < 5; i++) {

                renderer.setSeriesLinesVisible(
                        i,
                        true
                );

                renderer.setSeriesShapesVisible(
                        i,
                        false
                );

                renderer.setSeriesStroke(
                        i,
                        new BasicStroke(2.0f)
                );
            }


            renderer.setSeriesPaint(
                    5,
                    Color.BLUE
            );

            renderer.setSeriesLinesVisible(
                    5,
                    false
            );

            renderer.setSeriesShapesVisible(
                    5,
                    true
            );

            renderer.setSeriesShape(
                    5,
                    new java.awt.geom.Ellipse2D.Double(
                            -5,
                            -5,
                            10,
                            10
                    )
            );


            plot.setRenderer(renderer);

            chart.setBackgroundPaint(Color.WHITE);


            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();


            ChartUtils.writeChartAsPNG(
                    outputStream,
                    chart,
                    900,
                    500
            );


            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Error generating BMI-for-age Boys chart",
                    e
            );
        }
    }

}
