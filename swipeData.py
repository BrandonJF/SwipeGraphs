import os
import json

class Processor:
	def __init__(self):
		self.filepath = None
		self.textData = None
		self.delimiter = " "
		self.experiments = []
		self.currentExperiment = None
	def getData(self,filepath):
		self.filepath = filepath
		dataFile = os.path.expanduser(self.filepath)
		self.data = open(dataFile,"r")
	def setDelimiter(self, delimiter):
		self.delimiter = delimiter
	def createExperiment(self,experimentName):
		experiment = {}
		experiment["experiment"] = experimentName
		experiment["data"] = []
		return experiment
	def addDataToExperiment(self, data, experiment):
		experiment["data"].append(data)
	def storeExperiment(self,experiment):
		self.experiments.append(experiment)
	def processData(self):
		for line in self.data:
			line = line.strip()
			if line.find(self.delimiter) > -1:
				if self.currentExperiment:
					self.storeExperiment(self.currentExperiment)
				self.currentExperiment = self.createExperiment(line)
				continue
			self.addDataToExperiment(line.split(), self.currentExperiment)
		print self.experiments

swipeProcessor = Processor()
swipeProcessor.getData("/Users/brandon/Documents/swipeData.txt")
swipeProcessor.setDelimiter("experiment")
swipeProcessor.processData()