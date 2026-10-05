package org.israelsantos.imc_pediatrico.service;

import org.openpdf.text.*;
import org.openpdf.text.pdf.PdfWriter;

import org.israelsantos.imc_pediatrico.entity.Children;
import org.israelsantos.imc_pediatrico.entity.Control;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.openpdf.text.Document;
import org.openpdf.text.Font;
import org.openpdf.text.Chunk;
import org.openpdf.text.Paragraph;
import org.openpdf.text.Table;
import org.openpdf.text.Image;



@Service
public class PdfReportService {

    private final ControlService controlService;
    private final PdfChartService pdfChartService;

    public PdfReportService(
            ControlService controlService,
            PdfChartService pdfChartService) {

        this.controlService = controlService;
        this.pdfChartService = pdfChartService;
    }

    public byte[] generateChildReport(Children child) {

        try {

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            Document document = new Document();

            PdfWriter.getInstance(
                    document,
                    outputStream
            );

            document.open();

            Font titleFont = new Font(
                    Font.HELVETICA,
                    20,
                    Font.BOLD
            );

            Paragraph title = new Paragraph(
                    "Pediatric Health Report",
                    titleFont
            );

            document.add(title);

            Font sectionFont = new Font(
                    Font.HELVETICA,
                    14,
                    Font.BOLD
            );

            document.add(
                    new Paragraph(
                            "CHILD INFORMATION",
                            sectionFont
                    )
            );



            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Identification: " +
                                    displayValue(child.getIdentification())
                    )
            );

            document.add(
                    new Paragraph(
                            "Name: " +
                                    displayValue(
                                            child.getFirstName() +
                                                    " " +
                                                    child.getLastName()
                                    )
                    )
            );

            document.add(
                    new Paragraph(
                            "Birth date: " +
                                    displayValue(child.getBirthDate())
                    )
            );

            document.add(
                    new Paragraph(
                            "Gender: " +
                                    displayValue(child.getGender())
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Family history: " +
                                    displayValue(child.getFamilyHistory())
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Personal history: " +
                                    displayValue(child.getPersonalHistory())
                    )
            );

            document.add(
                    new Paragraph(
                            "CONTROLS",
                            sectionFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            List<Control> controls =
                    controlService.findByChildIdentification(
                            child.getIdentification()
                    );

            if (controls.isEmpty()) {

                document.add(
                        new Paragraph(
                                "No controls recorded."
                        )
                );

            } else {

                Table table = new Table(4);

                table.setWidth(100);
                table.setPadding(5);

                table.setWidths(new float[]{
                        25,
                        20,
                        20,
                        15
                });

                table.addCell("Date");
                table.addCell("Weight");
                table.addCell("Height");
                table.addCell("BMI");

                for (Control control : controls) {

                    table.addCell(
                            displayValue(control.getControlDate())
                    );

                    table.addCell(
                            displayValue(control.getWeight())
                    );

                    table.addCell(
                            displayValue(control.getHeight())
                    );

                    table.addCell(
                            displayValue(control.getBmi())
                    );
                }

                document.add(table);

                document.add(
                        new Paragraph(" ")
                );


                document.add(
                        new Paragraph(
                                "GROWTH ASSESSMENT",
                                sectionFont
                        )
                );

                document.add(
                        new Paragraph(" ")
                );

                for (Control control : controls) {

                    document.add(
                            new Paragraph(
                                    "Control date: " +
                                            displayValue(control.getControlDate())
                            )
                    );

                    document.add(
                            new Paragraph(
                                    "Height/Age: " +
                                            displayValue(
                                                    control.getHeightForAgeResult()
                                            )
                            )
                    );

                    document.add(
                            new Paragraph(
                                    "Weight/Age: " +
                                            displayValue(
                                                    control.getWeightForAgeResult()
                                            )
                            )
                    );

                    document.add(
                            new Paragraph(
                                    "BMI/Age: " +
                                            displayValue(
                                                    control.getBmiForAgeResult()
                                            )
                            )
                    );

                    document.add(
                            new Paragraph(" ")
                    );
                }
            }
            document.add(
                    new Paragraph(" ")
            );



            document.add(
                    new Paragraph(
                            "CLINICAL INFORMATION",
                            sectionFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );
            for (Control control : controls) {

                Paragraph controlDateParagraph = new Paragraph();

                controlDateParagraph.add(
                        new Chunk(
                                "Control date: ",
                                new Font(
                                        Font.HELVETICA,
                                        12,
                                        Font.BOLD
                                )
                        )
                );

                controlDateParagraph.add(
                        new Chunk(
                                displayValue(control.getControlDate())
                        )
                );

                document.add(controlDateParagraph);

                Table clinicalTable = new Table(2);

                clinicalTable.setWidth(100);
                clinicalTable.setPadding(5);

                clinicalTable.setWidths(new float[]{
                        60,
                        40
                });

                clinicalTable.addCell("Measurement");
                clinicalTable.addCell("Value");

                clinicalTable.addCell("Head circumference");
                clinicalTable.addCell(
                        displayValue(control.getHeadCircumference())
                );

                clinicalTable.addCell("Thoracic circumference");
                clinicalTable.addCell(
                        displayValue(control.getThoracicCircumference())
                );

                clinicalTable.addCell("Abdominal circumference");
                clinicalTable.addCell(
                        displayValue(control.getAbdominalCircumference())
                );

                clinicalTable.addCell("Heart rate");
                clinicalTable.addCell(
                        displayValue(control.getHeartRate())
                );

                clinicalTable.addCell("Respiratory rate");
                clinicalTable.addCell(
                        displayValue(control.getRespiratoryRate())
                );

                clinicalTable.addCell("Oxygen saturation");
                clinicalTable.addCell(
                        displayValue(control.getOxygenSaturation())
                );

                clinicalTable.addCell("Temperature");
                clinicalTable.addCell(
                        displayValue(control.getTemperature())
                );

                clinicalTable.addCell("Hemoglobin");
                clinicalTable.addCell(
                        displayValue(control.getHemoglobin())
                );

                clinicalTable.addCell("Diet");
                clinicalTable.addCell(
                        displayValue(control.getDiet())
                );

                clinicalTable.addCell("Meals per day");
                clinicalTable.addCell(
                        displayValue(control.getMealsPerDay())
                );

                document.add(clinicalTable);

                document.add(
                        new Paragraph(" ")
                );
            }
            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "GROWTH CHARTS",
                            sectionFont
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            System.out.println(
                    "Generating PDF for gender: " +
                            child.getGender()
            );

            if ("Female".equalsIgnoreCase(child.getGender())) {
            byte[] weightForAgeChart =
                    pdfChartService.generateWeightForAgeChart(
                            child,
                            controls
                    );


                Image chartImage =
                        Image.getInstance(weightForAgeChart);

                chartImage.scaleToFit(500, 300);

                document.add(chartImage);

                byte[] heightForAgeChart =
                        pdfChartService.generateHeightForAgeChart(
                                child,
                                controls
                        );

                Image heightChartImage =
                        Image.getInstance(heightForAgeChart);

                heightChartImage.scaleToFit(500, 300);

                document.add(heightChartImage);

                byte[] bmiForAgeChart =
                        pdfChartService.generateBmiForAgeChart(
                                child,
                                controls
                        );

                Image bmiChartImage =
                        Image.getInstance(bmiForAgeChart);

                bmiChartImage.scaleToFit(500, 300);

                document.add(bmiChartImage);
            } else if ("Male".equalsIgnoreCase(child.getGender())) {

                byte[] weightForAgeChart =
                        pdfChartService.generateWeightForAgeBoysChart(
                                child,
                                controls
                        );

                Image weightChartImage =
                        Image.getInstance(weightForAgeChart);

                weightChartImage.scaleToFit(500, 300);

                document.add(weightChartImage);


                byte[] heightForAgeChart =
                        pdfChartService.generateHeightForAgeBoysChart(
                                child,
                                controls
                        );

                Image heightChartImage =
                        Image.getInstance(heightForAgeChart);

                heightChartImage.scaleToFit(500, 300);

                document.add(heightChartImage);

                byte[] bmiForAgeChart =
                        pdfChartService.generateBmiForAgeBoysChart(
                                child,
                                controls
                        );

                Image bmiChartImage =
                        Image.getInstance(bmiForAgeChart);

                bmiChartImage.scaleToFit(500, 300);

                document.add(bmiChartImage);
            }

            document.close(); /*<==== finale */

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Error generating PDF report",
                    e
            );
        }




    }

    private String displayValue(Object value) {

        if (value == null) {
            return "Not recorded";
        }

        if (value instanceof Number &&
                ((Number) value).doubleValue() == 0) {
            return "Not recorded";
        }

        if (value instanceof String &&
                ((String) value).trim().isEmpty()) {
            return "Not recorded";
        }

        return value.toString();
    }
}